// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getStackCategoryByIdMiddleware from "../../middlewares/stackCategories/getStackCategoryByIdMiddleware";
    import searchStackCategoriesMiddleware from "../../middlewares/stackCategories/searchStackCategoriesMiddleware";
    import createStackCategoryMiddleware from "../../middlewares/stackCategories/createStackCategoryMiddleware";
    import updateStackCategoryMiddleware from "../../middlewares/stackCategories/updateStackCategoryMiddleware";
    import deleteStackCategoryMiddleware from "../../middlewares/stackCategories/deleteStackCategoryMiddleware";

    // controllers
    import getAllStackCategoriesController from "../../controllers/stackCategories/getAllStackCategoriesController";
    import searchStackCategoriesController from "../../controllers/stackCategories/searchStackCategoriesController";
    import getStackCategoryByIdController from "../../controllers/stackCategories/getStackCategoryByIdController";
    import createStackCategoryController from "../../controllers/stackCategories/createStackCategoryController";
    import updateStackCategoryController from "../../controllers/stackCategories/updateStackCategoryController";
    import deleteStackCategoryController from "../../controllers/stackCategories/deleteStackCategoryController";

// router config
    // definition
    const stackCategoryRouter = Router();

    // get all
    stackCategoryRouter.get('/', 
        authRequiredMiddleware,
        getAllStackCategoriesController
    );

    // search
    stackCategoryRouter.get('/search',
        authRequiredMiddleware,
        searchStackCategoriesMiddleware,
        searchStackCategoriesController
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
    stackCategoryRouter.put('/:id', 
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