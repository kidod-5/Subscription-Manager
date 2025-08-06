
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); 

        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
}


export const updateUser = async (req, res, next) => {
    try {
        // Ensure user can only update their own profile (unless admin)
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error("You can only update your own profile");
            error.statusCode = 403;
            throw error;
        }

        const updateData = { ...req.body };

        // If password is being updated, hash it
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        // Don't allow email updates that conflict with existing users
        if (updateData.email) {
            const existingUser = await User.findOne({ 
                email: updateData.email, 
                _id: { $ne: req.params.id } 
            });
            if (existingUser) {
                const error = new Error("Email already in use by another user");
                error.statusCode = 409;
                throw error;
            }
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        }); 

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch(error){
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        // Ensure user can only delete their own profile (unless admin)
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error("You can only delete your own profile");
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch(error){
        next(error);
    }
}

