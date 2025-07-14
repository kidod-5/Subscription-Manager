import { Router } from "express";
import { signUp, logIn, logOut } from "../controllers/auth.controller.js";

const authRouter = Router();

//paths: /api/v1/auth/...

authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', logIn);

authRouter.post('/sign-out', logOut);


export default authRouter;
