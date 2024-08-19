import Joi from "joi";

// Joi schema for User validation
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30), // Name must be between 3 and 30 characters
    surname: Joi.string().min(3).max(30), // Surname must be between 3 and 30 characters
    email: Joi.string().email(), // Email must be a valid email format
    dateOfBirth: Joi.date().iso(), // Date of birth must be in ISO format
});

// Middleware to validate User data
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body); // Validate request body against schema

    if (error) {
        // If validation fails, respond with a 400 status and error message
        return res.status(400).json({ message: error.message });
    }

    next(); // If validation passes, proceed to the next middleware
};

export default validateUser;
