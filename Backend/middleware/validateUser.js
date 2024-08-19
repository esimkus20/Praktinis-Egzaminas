import Joi from "joi";

// Joi schema for User validation
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    surname: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    dateOfBirth: Joi.date().iso(),
});

// Middleware to validate User data
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    next();
};

export default validateUser;
