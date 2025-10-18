// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getImageCategoryByIdMiddleware from "../../middlewares/imageCategories/getImageCategoryByIdMiddleware";
    import createImageCategoryMiddleware from "../../middlewares/imageCategories/createImageCategoryMiddleware";
    import UpdateImageCategoryMiddleware from "../../middlewares/imageCategories/updateImageCategoryMiddleware";
    import deleteImageCategoryMiddleware from "../../middlewares/imageCategories/deleteImageCategoryMiddleware";

    // controllers
    import getAllImageCategories from "../../controllers/imageCategory/getAllImageCategoriesController";
    import getImageCategoryByIdController from "../../controllers/imageCategory/getImageCategoryByIdController";
    import searchImageCategoryController from "../../controllers/imageCategory/searchImageCategoryController";
    import createImageCategoryController from "../../controllers/imageCategory/createImageCategoryController";
    import updateImageCategoryController from "../../controllers/imageCategory/updateImageCategoryController";
    import deleteImageCategoryController from "../../controllers/imageCategory/deleteImageCategoryController";

// router config
    // definition
    const imageCategoriesRouter = Router();
    
    // routes register
        // get all
        imageCategoriesRouter.get('/',
            authRequiredMiddleware,
            getAllImageCategories
        );

        // get by id
        imageCategoriesRouter.get('/:id',
            authRequiredMiddleware,
            getImageCategoryByIdMiddleware,
            getImageCategoryByIdController
        );

        // search
        imageCategoriesRouter.get('/search',
            authRequiredMiddleware,
            searchImageCategoryController
        );

        // register/create
        imageCategoriesRouter.post('/',
            authRequiredMiddleware,
            createImageCategoryMiddleware,
            createImageCategoryController
        );

        // update/edit
        imageCategoriesRouter.put('/:id',
            authRequiredMiddleware,
            UpdateImageCategoryMiddleware,
            updateImageCategoryController
        );

        // delete
        imageCategoriesRouter.delete('/',
            authRequiredMiddleware,
            deleteImageCategoryMiddleware,
            deleteImageCategoryController
        );

// exporting router
export default imageCategoriesRouter;