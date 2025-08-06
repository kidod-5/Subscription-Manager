import Subscription from '../models/subscription.model.js';

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user._id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to view this subscription");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to update this subscription");
            error.statusCode = 403;
            throw error;
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to delete this subscription");
            error.statusCode = 403;
            throw error;
        }

        await Subscription.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error("You are not authorized to view this user's subscriptions");
            error.statusCode = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to cancel this subscription");
            error.statusCode = 403;
            throw error;
        }

        subscription.status = 'canceled';
        await subscription.save();

        res.status(200).json({ 
            success: true, 
            message: "Subscription canceled successfully",
            data: subscription 
        });
    } catch (error) {
        next(error);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const today = new Date();
        const lookAheadDays = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        // Get all active subscriptions for the user
        const activeSubscriptions = await Subscription.find({
            user: req.user._id,
            status: 'active'
        });

        const upcomingRenewals = activeSubscriptions.filter(subscription => {
            const daysAhead = lookAheadDays[subscription.interval];
            const lookAheadDate = new Date();
            lookAheadDate.setDate(today.getDate() + daysAhead);

            return subscription.renewalDate >= today && subscription.renewalDate <= lookAheadDate;
        });

        res.status(200).json({ success: true, data: upcomingRenewals });
    } catch (error) {
        next(error);
    }
};