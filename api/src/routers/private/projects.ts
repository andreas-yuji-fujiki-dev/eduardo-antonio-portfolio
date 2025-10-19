// imports
    // express
    import { Router } from "express";
    
    // middlewares
    import registerProjectMiddleware from "../../middlewares/projects/registerProjectMiddleware";
    import searchProjectsMiddleware from "../../middlewares/projects/searchProjectsMiddleware";
    import authRequiredMiddleware from "../../middlewares/auth/authRequiredMiddleware";
    import getProjectByIdMiddleware from "../../middlewares/projects/getProjectByIdMiddleware";
    import editProjectMiddleware from "../../middlewares/projects/editProjectMiddleware";
    import deleteProjectMiddleware from "../../middlewares/projects/deleteProjectMiddleware";

    // controllers
    import registerProjectController from "../../controllers/projects/registerProjectController";
    import searchProjectsController from "../../controllers/projects/searchProjectsController";
    import getAllProjectsController from "../../controllers/projects/getAllProjectsController";
    import getProjectByIdController from "../../controllers/projects/getProjectByIdController";
    import editProjectController from "../../controllers/projects/editProjectController";
    import deleteProjectController from "../../controllers/projects/deleteProjectController";
    

// router config
    // router definition
    const projectsRouter = Router();

    // registering routes
        // get all projects
        projectsRouter.get('/', 
            authRequiredMiddleware, 
            getAllProjectsController
        );

        // search
        projectsRouter.get('/search',
            authRequiredMiddleware,
            searchProjectsMiddleware,
            searchProjectsController
        );

        // get project by id
        projectsRouter.get('/:id', 
            authRequiredMiddleware, 
            getProjectByIdMiddleware, 
            getProjectByIdController
        );

        // register/create project
        projectsRouter.post('/', 
            authRequiredMiddleware,
            registerProjectMiddleware,
            registerProjectController
        );

        // edit project
        projectsRouter.put('/:id', 
            authRequiredMiddleware, 
            editProjectMiddleware, 
            editProjectController
        )

        // delete project
        projectsRouter.delete('/:id', 
            authRequiredMiddleware, 
            deleteProjectMiddleware, 
            deleteProjectController
        )

// exporting
export default projectsRouter; 
