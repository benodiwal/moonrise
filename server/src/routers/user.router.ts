import UserController from "controllers/user.controller";
import AbstractRouter from "./index.router";

class UserRouter extends AbstractRouter {
    registerRoutes() {
        const userController = new UserController(this.ctx);
        this.registerGET('/', userController.get());
        this.registerPOST('/signin', userController.signin());
        this.registerPOST('/logout', userController.logout());
    }
}

export default UserRouter;
