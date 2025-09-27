// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";

    // controllers
    import getAllImageCategories from "../../controllers/imageCategory/getAllImageCategoriesController";


// router config
    // definition
    const imageCategoriesRouter = Router()
    
    // routes register
        // get all
        imageCategoriesRouter.get('/',
            authRequiredMiddleware,
            getAllImageCategories
        )

        // get by id
        imageCategoriesRouter.get('/:id',
            authRequiredMiddleware,
            /*
                const { id } = req.params;
                const imageCategoryBySpecificId = await prisma.imageCategory.findUnique({
                    where: {
                        id
                    }
                })
            
            */
        )

        // register/create
        imageCategoriesRouter.post('/',
            authRequiredMiddleware,
        )

        // update/edit
        imageCategoriesRouter.put('/',
            authRequiredMiddleware,
        )

        // delete
        imageCategoriesRouter.delete('/',
            authRequiredMiddleware,
        )

// exporting router
export default imageCategoriesRouter;