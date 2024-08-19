import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

dotenv.config();

// Create a new admin
export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            // If admin exists, return an error
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        // Save admin to the database
        await newAdmin.save();

        // Respond with the created admin
        res.status(201).json(newAdmin);
    } catch (error) {
        // Handle any errors
        res.status(409).json({ message: error.message });
    }
};

// Login an admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            // If admin not found, return an error
            res.status(404).json({ message: "Admin not found" });
            return;
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (isPasswordCorrect) {
            // Generate a JWT token if the password is correct
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                secretKey,
                { expiresIn: "1h" }
            );

            // Respond with the generated token
            res.json({ token });
        } else {
            // If password is incorrect, return an error
            res.status(400).json({ message: "Invalid password" });
        }
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

// Get all admins
export const getAdmins = async (req, res) => {
    try {
        // Retrieve all admins from the database
        const admins = await Admin.find();

        // Respond with the list of admins
        res.status(200).json(admins);
    } catch (error) {
        // Handle any errors
        res.status(404).json({ message: error.message });
    }
};
