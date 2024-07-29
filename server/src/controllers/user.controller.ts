import { InternalServerError } from "errors/internal-server-error";
import AbstractController from "./index.controller";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import isAuthenticated from "middlewares/isAuthenticated.middleware";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import { IncorrectSignatureError } from "errors/incorrect-signature";

class UserController extends AbstractController {
    signin() {
        const payloadSchema = z.object({ publicKey: z.any(), signature: z.any() });
        type IPayload = z.infer<typeof payloadSchema>;

        return [
            async (req: Request<unknown, unknown, IPayload>, res: Response, next: NextFunction) => {
                try {
                    const { publicKey, signature } = req.body;
                    const message = new TextEncoder().encode("Signin to moonrise as user");

                    const result = nacl.sign.detached.verify(message, new Uint8Array(signature.data), new PublicKey(publicKey).toBytes());
                    if (!result) {
                        next(new IncorrectSignatureError());
                    }

                    const existingUser = await this.ctx.db.client.user.findFirst({
                        where: {
                            address: publicKey
                        }
                    });

                    if (existingUser) {
                        req.session.currentUserId = existingUser.id;
                        return res.sendStatus(200);
                    }

                    const user = await this.ctx.db.client.user.create({
                        data: {
                            address: publicKey
                        }                    
                    });
                    req.session.currentUserId = user.id;
                    res.sendStatus(200);

                } catch (e: unknown) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

    get() {
        return [
            isAuthenticated(this.ctx),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await this.ctx.db.client.user.findFirst({
                        where: {
                            id: req.session.currentUserId
                        }
                    });
                    
                    return res.json({
                        result: user,
                    });
                } catch (e: unknown) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }   
        ];
    }  

    logout() {
        return [
            isAuthenticated(this.ctx),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    req.session.currentUserId = undefined;
                    return res.sendStatus(204);       
                } catch (e: unknown) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }
}

export default UserController;
