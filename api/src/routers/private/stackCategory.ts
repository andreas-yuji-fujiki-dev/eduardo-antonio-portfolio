// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";

    // controllers
    import getAllStackCategoriesController from "../../controllers/stackCategory/getAllStackCategoriesController";

// router config
    // definition
    const stackCategoryRouter = Router();

    // get all
    stackCategoryRouter.get('/', 
        authRequiredMiddleware,
        getAllStackCategoriesController
    );

    // get by id
    stackCategoryRouter.get('/:id', 
        authRequiredMiddleware,
    );

    // register/create
    stackCategoryRouter.post('/', 
        authRequiredMiddleware,
    );

    // update/edit
    stackCategoryRouter.post('/', 
        authRequiredMiddleware,
    );

    // delete
    stackCategoryRouter.delete('/', 
        authRequiredMiddleware,
    );

// exporting
export default stackCategoryRouter;