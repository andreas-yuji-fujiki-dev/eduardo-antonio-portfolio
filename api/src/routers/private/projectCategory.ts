// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getProjectCategoryByIdMiddleware from "../../middlewares/projectCategories/getProjectCategoryByIdMiddleware";
    import createProjectCategoryMiddleware from "../../middlewares/projectCategories/createProjectCategoryMiddleware";
    import updateProjectCategoryMiddleware from "../../middlewares/projectCategories/updateProjectCategoryMiddleware";
    import deleteProjectCategoryMiddleware from "../../middlewares/projectCategories/deleteProjectCategoryMiddleware";

    // controllers
    import getAllProjectCategoriesController from "../../controllers/projectCategory/getAllProjectCategoriesController";
    import getProjectCategoryByIdController from "../../controllers/projectCategory/getProjectCategoryByIdController";
    import searchProjectCategoriesController from "../../controllers/projectCategory/searchProjectCategoriesController";
    import createProjectCategoryController from "../../controllers/projectCategory/createProjectCategoryController";
    import updateProjectCategoryController from "../../controllers/projectCategory/updateProjectCategoryController";
    import deleteProjectCategoryController from "../../controllers/projectCategory/deleteProjectCategoryController";

// router config
    // definition
    const projectCategoriesRouter = Router();

    // get all
    projectCategoriesRouter.get('/',
        authRequiredMiddleware,
        getAllProjectCategoriesController
    );

    // search
    projectCategoriesRouter.get('/search',
        authRequiredMiddleware,
        searchProjectCategoriesController
    );

    // get by id
    projectCategoriesRouter.get('/:id',
        authRequiredMiddleware,
        getProjectCategoryByIdMiddleware,
        getProjectCategoryByIdController
    );

    // register/create
    projectCategoriesRouter.post('/',
        authRequiredMiddleware,
        createProjectCategoryMiddleware,
        createProjectCategoryController
    );

    // update/edit
    projectCategoriesRouter.put('/:id',
        authRequiredMiddleware,
        updateProjectCategoryMiddleware,
        updateProjectCategoryController
    );

    // delete
    projectCategoriesRouter.delete('/:id',
        authRequiredMiddleware,
        deleteProjectCategoryMiddleware,
        deleteProjectCategoryController
    );

// exporting
export default projectCategoriesRouter;