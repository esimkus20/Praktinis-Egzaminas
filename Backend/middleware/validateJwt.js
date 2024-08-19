import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const validateJwt = (req, res, next) => {
    const { authorization } = req.headers;

    const secretKey = process.env.SECRET_KEY;

    try {
        jwt.verify(authorization.split(" ")[1], secretKey);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
