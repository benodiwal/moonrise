import UserController from "controllers/user.controller";
import AbstractRouter from "./index.router";

class UserRouter extends AbstractRouter {
    registerRoutes() {
        const userController = new UserController(this.ctx);
        this.registerPOST('/signin', userController.signin());
        this.registerGET('/me', userController.me());
    }
}

export default UserRouter;
