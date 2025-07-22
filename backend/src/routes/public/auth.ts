// imports
    // express
    import { Router } from "express";

    // middlewares
    import authFieldsMiddleware from "../../middlewares/auth/authFieldsMiddleware";

    // controllers
    import userRegisterController from "../../controllers/auth/userRegisterController";
    import userLoginController from "../../controllers/auth/userLoginController";

// router config
    // definition
    const authRouter = Router();

    // registering routes
        // register
        authRouter.post('/register', 
            authFieldsMiddleware, 
            userRegisterController
        );

        // login
        authRouter.post('/login', 
            authFieldsMiddleware, 
            userLoginController
        );

// exporting
export default authRouter;