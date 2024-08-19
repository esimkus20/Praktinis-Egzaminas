import Joi from "joi";

// Joi schema for Admin validation
const adminSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(), // Name must be between 3 and 30 characters
    email: Joi.string().email().required(), // Email must be a valid email format
    password: Joi.string().min(6).required(), // Password must be at least 6 characters
});

// Middleware to validate Admin data
const validateAdmin = (req, res, next) => {
    const { error } = adminSchema.validate(req.body); // Validate request body against schema

    if (error) {
        // If validation fails, respond with a 400 status and error message
        return res.status(400).json({ message: error.message });
    }

    next(); // If validation passes, proceed to the next middleware
};

export default validateAdmin;
