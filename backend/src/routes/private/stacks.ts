// imports
    // express
    import { Router } from "express";
    
    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getStackByIdMiddleware from "../../middlewares/stacks/getStackByIdMiddleware";
    import createStackMiddleware from "../../middlewares/stacks/createStackMiddleware";
    import editStackMiddleware from "../../middlewares/stacks/editStackMiddleware";
    import deleteStackMiddleware from "../../middlewares/stacks/deleteStackMiddleware";

    // controllers
    import getAllStacksController from "../../controllers/stacks/getAllStacksController";
    import getStackByIdController from "../../controllers/stacks/getStackByIdController";
    import createStackController from "../../controllers/stacks/createStackController";
    import editStackController from "../../controllers/stacks/editStackController";
    import deleteStackController from "../../controllers/stacks/deleteStackController";
    

// router config
    // definition
    const stacksRouter = Router();
    
    // registering routes
        // get all
        stacksRouter.get('/',
            authRequiredMiddleware,
            getAllStacksController
        );

        // get by id
        stacksRouter.get('/:id',
            authRequiredMiddleware,
            getStackByIdMiddleware,
            getStackByIdController
        );

        // register/create
        stacksRouter.post('/',
            authRequiredMiddleware,
            createStackMiddleware,
            createStackController
        );

        // edit
        stacksRouter.put('/:id',
            authRequiredMiddleware,
            editStackMiddleware,
            editStackController
        );

        // delete
        stacksRouter.delete('/:id',
            authRequiredMiddleware,
            deleteStackMiddleware,
            deleteStackController
        );

// exporting
export default stacksRouter;