// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getStackCategoryByIdMiddleware from "../../middlewares/stackCategories/getStackCategoryByIdMiddleware";
    import createStackCategoryMiddleware from "../../middlewares/stackCategories/createStackCategoryMiddleware";
    import updateStackCategoryMiddleware from "../../middlewares/stackCategories/updateStackCategoryMiddleware";
    import deleteStackCategoryMiddleware from "../../middlewares/stackCategories/deleteStackCategoryMiddleware";

    // controllers
    import getAllStackCategoriesController from "../../controllers/stackCategory/getAllStackCategoriesController";
    import getStackCategoryByIdController from "../../controllers/stackCategory/getStackCategoryByIdController";
    import createStackCategoryController from "../../controllers/stackCategory/createStackCategoryController";
    import updateStackCategoryController from "../../controllers/stackCategory/updateStackCategoryController";
    import deleteStackCategoryController from "../../controllers/stackCategory/deleteStackCategoryController";

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
        getStackCategoryByIdMiddleware,
        getStackCategoryByIdController
    );

    // register/create
    stackCategoryRouter.post('/', 
        authRequiredMiddleware,
        createStackCategoryMiddleware,
        createStackCategoryController
    );

    // update/edit
    stackCategoryRouter.post('/:id', 
        authRequiredMiddleware,
        updateStackCategoryMiddleware,
        updateStackCategoryController
    );

    // delete
    stackCategoryRouter.delete('/:id', 
        authRequiredMiddleware,
        deleteStackCategoryMiddleware,
        deleteStackCategoryController
    );

// exporting
export default stackCategoryRouter;