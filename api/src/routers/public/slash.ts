import { Router } from "express";

const slashRouter = Router();

slashRouter.get('/', ( req, res ) => {
    res.status(200).json({
        status: 200,
        message: 'Hello, World!',
        easteregg: "O_O"
    })
})

export default slashRouter;