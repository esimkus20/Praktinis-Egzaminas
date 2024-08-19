import mongoose from "mongoose";

export const validateId = async (req, res, next) => {
    const { id } = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
        res.status(400).json({ message: "Invalid ID" });
        return;
    }

    next();
};
