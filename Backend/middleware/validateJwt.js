import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Middleware to validate JWT
export const validateJwt = (req, res, next) => {
    const { authorization } = req.headers; // Get the authorization header

    const secretKey = process.env.SECRET_KEY; // Get the secret key from environment variables

    try {
        // Verify the JWT token
        jwt.verify(authorization.split(" ")[1], secretKey);
        next(); // If token is valid, proceed to the next middleware
    } catch (error) {
        // If token is invalid, respond with a 401 status and error message
        res.status(401).json({ message: "Unauthorized" });
    }
};
