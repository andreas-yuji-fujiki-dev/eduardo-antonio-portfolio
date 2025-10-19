// imports 
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getImageByIdMiddleware from "../../middlewares/images/getImageByIdMiddleware";
    import createImageMiddleware from "../../middlewares/images/createImageMiddleware";
    import updateImageMiddleware from "../../middlewares/images/updateImageMiddleware";
    import replaceImageMiddleware from '../../middlewares/images/replaceImageMiddleware';
    import deleteImageMiddleware from "../../middlewares/images/deleteImageMiddleware";
    
    // controllers
    import getAllImagesController from "../../controllers/images/getAllImagesController";
    import searchImagesController from "../../controllers/images/searchImagesController";
    import getImageByIdController from "../../controllers/images/getImageByIdController";
    import createImageController from "../../controllers/images/createImageController";
    import updateImageController from "../../controllers/images/updateImageController";
    import replaceImageController from '../../controllers/images/replaceImageController';
    import deleteImageController from "../../controllers/images/deleteImageController";
    

// router config
    // definition
    const imagesRouter = Router();

    // routes register
        // get all 
        imagesRouter.get('/', 
            authRequiredMiddleware,
            getAllImagesController
        );
        
        // search
        imagesRouter.get('/search',
            authRequiredMiddleware,
            searchImagesController
        );

        // get by id
        imagesRouter.get('/:id',
            authRequiredMiddleware,
            getImageByIdMiddleware,
            getImageByIdController
        );

        // register/create
        imagesRouter.post('/',
            authRequiredMiddleware,
            createImageMiddleware,
            createImageController
        );

        // update/edit
        imagesRouter.put('/:id',
            authRequiredMiddleware,
            updateImageMiddleware,
            updateImageController
        );

        // replace
        imagesRouter.put('/:id/replace', 
            authRequiredMiddleware,
            replaceImageMiddleware,
            replaceImageController
        );

        // delete
        imagesRouter.delete('/:id',
            authRequiredMiddleware,
            deleteImageMiddleware,
            deleteImageController
        );

// exporting router
export default imagesRouter;