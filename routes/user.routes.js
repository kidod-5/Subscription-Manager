import { Router } from "express";

const userRouter = Router();

userRouter.get('/users', (req, res) => res.send({title: "Get All Profiles"}));

userRouter.get('/:id', (req, res) => res.send({title: "Get User Profile"}));

userRouter.post('/', (req, res) => res.send({title: "Create User Profile"}));

userRouter.put('/:id', (req, res) => res.send({title: "Update User Profile"}));

userRouter.delete('/:id', (req, res) => res.send({title: "Delete User Profile"}));

export default userRouter;