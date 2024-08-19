import mongoose from "mongoose";

// Middleware to validate MongoDB ObjectId
export const validateId = async (req, res, next) => {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
        // If ID is not valid, respond with a 400 status and error message
        res.status(400).json({ message: "Invalid ID" });
        return;
    }

    next(); // If ID is valid, proceed to the next middleware
};
