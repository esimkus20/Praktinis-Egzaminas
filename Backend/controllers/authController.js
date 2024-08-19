import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

dotenv.config();

// Create a new admin
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Login an admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (isPasswordCorrect) {
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                secretKey,
                { expiresIn: "1h" }
            );

            res.json({ token });
        } else {
            res.status(400).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Just for testing:
export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();

        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
