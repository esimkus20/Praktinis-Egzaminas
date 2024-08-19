import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, surname, email, dateOfBirth } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        const newUser = new User({
            name,
            surname,
            email,
            dateOfBirth,
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, surname, email, dateOfBirth } = req.body;

        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "Email already in use" });
                return;
            }
        }

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (email) user.email = email;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
