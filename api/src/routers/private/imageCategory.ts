// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getImageCategoryByIdMiddleware from "../../middlewares/imagesCategory/getImageCategoryByIdMiddleware";
    import createImageCategoryMiddleware from "../../middlewares/imagesCategory/createImageCategoryMiddleware";
    import UpdateImageCategoryMiddleware from "../../middlewares/imagesCategory/UpdateImageCategoryMiddleware";

    // controllers
    import getAllImageCategories from "../../controllers/imageCategory/getAllImageCategoriesController";
    import getImageCategoryByIdController from "../../controllers/imageCategory/getImageCategoryByIdController";
    import createImageCategoryController from "../../controllers/imageCategory/createImageCategoryController";
    import updateImageCategoryController from "../../controllers/imageCategory/updateImageCategoryController";


// router config
    // definition
    const imageCategoriesRouter = Router()
    
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
        );

// exporting router
export default imageCategoriesRouter;