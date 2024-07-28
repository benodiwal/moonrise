import { InternalServerError } from "errors/internal-server-error";
import AbstractController from "./index.controller";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import isAuthenticated from "middlewares/isAuthenticated.middleware";

class UserController extends AbstractController {
    signin() {
        const payloadSchema = z.object({ publicKey: z.string(), signatrue: z.any() });
        type IPayload = z.infer<typeof payloadSchema>;

        return [
            async (req: Request<unknown, unknown, IPayload>, res: Response, next: NextFunction) => {
                try {
                    console.log(req);
                    console.log(res);
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
