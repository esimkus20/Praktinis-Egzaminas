import Joi from "joi";

// Joi schema for Admin validation
const adminSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Middleware to validate Admin data
const validateAdmin = (req, res, next) => {
    const { error } = adminSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    next();
};

export default validateAdmin;
