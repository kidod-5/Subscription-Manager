import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";

export const signUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error("User already exists with this email");
            error.statusCode = 409;
            throw error;
        }
        

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], {session});

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,  
            message: "User created successfully",
            data: {
                token,
                user: newUser[0]
            }     
        });
    
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const logIn = async(req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // try{
    //     const {email, password} = req.body;

    //     const existingUser = await User.findOne({email});

    //     if(!existingUser){
    //         const error = new Error("User not found");
    //         error.statusCode = 404;
    //         throw error;
    //     }

    //     const isMatch = await bcrypt.compare(password, existingUser.password);
    //     if(!isMatch){
    //         const error = new Error("Invalid credentials");
    //         error.statusCode = 401;
    //         throw error;
    //     }

    //     const token = jwt.sign({userId: existingUser._id}, JWT_SECRET, {
    //         expiresIn: JWT_EXPIRES_IN
    //     });

    //     await session.commitTransaction();
    //     session.endSession();

    //     res.status(200).json({
    //         success: true,
    //         message: "User logged in successfully",
    //         data: {
    //             token,
    //             user: existingUser
    //         }
    //     });
    // }catch(error){
    //     await session.abortTransaction();
    //     se ssion.endSession();
    //     next(error);
    // }
}

export const logOut = async(req, res, next) => {}