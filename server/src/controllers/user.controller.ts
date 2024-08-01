import { InternalServerError } from "errors/internal-server-error";
import AbstractController from "./index.controller";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import isAuthenticated from "middlewares/isAuthenticated.middleware";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import { IncorrectSignatureError } from "errors/incorrect-signature";
import { storageMiddleware } from "middlewares/storage.middleware";
import s3ServiceClient from "libs/s3.lib";
import { BadRequestError } from "errors/bad-request-error";

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

    upload() {
        return [
            isAuthenticated(this.ctx),
            storageMiddleware(),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    if (!req.file) {
                        next(new BadRequestError('File not found'));
                    }
                    const userId = req.session.currentUserId as string;
                    const file = req.file as unknown as Express.Multer.File;
                    const fileBuffer = file.buffer;
                    const fileName = file.originalname;

                    const url = await s3ServiceClient.uploadThumbnail(fileName, fileBuffer);
                    if (!url) {
                        return res.status(500).send({ message: 'Failed to upload video' });
                    }

                    await this.ctx.db.client.thumbnail.create({
                        data: {
                            url,
                            user: {
                                connect: {
                                    id: parseInt(userId),
                            }
                            }
                        }
                    });

                    return res.sendStatus(200);
                } catch (e: unknown) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

    thumbnails() {
        return [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const userId = req.session.currentUserId as unknown as string;
                    const thumbnails = await this.ctx.db.client.thumbnail.findMany({
                        where: {
                            userId: parseInt(userId)
                        }
                    }); 

                    return res.status(200).json({
                        result: thumbnails
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
