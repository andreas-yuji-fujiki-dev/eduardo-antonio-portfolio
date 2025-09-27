// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getImageCategoryByIdMiddleware from "../../middlewares/imagesCategory/getImageCategoryByIdMiddleware";

    // controllers
    import getAllImageCategories from "../../controllers/imageCategory/getAllImageCategoriesController";
    import getImageCategoryByIdController from "../../controllers/imageCategory/getImageCategoryByIdController";


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
        );

        // update/edit
        imageCategoriesRouter.put('/',
            authRequiredMiddleware,
        );

        // delete
        imageCategoriesRouter.delete('/',
            authRequiredMiddleware,
        );

// exporting router
export default imageCategoriesRouter;