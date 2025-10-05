// imports
    // express
    import { Router } from "express";

    // middlewares
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";

    // controllers
    import getAllProjectsCategoryController from "../../controllers/projectsCategory/getAllProjectsCategoryController";

// router config
    // definition
    const projectsCategoryRouter = Router();

    // get all
    projectsCategoryRouter.get('/',
        authRequiredMiddleware,
        getAllProjectsCategoryController
    );

    // get by id
    projectsCategoryRouter.get('/',
        authRequiredMiddleware,
    );

    // register/create
    projectsCategoryRouter.post('/',
        authRequiredMiddleware,
    );

    // update/edit
    projectsCategoryRouter.patch('/',
        authRequiredMiddleware,
    );

    // delete
    projectsCategoryRouter.delete('/',
        authRequiredMiddleware,
    );