import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, surname, email, dateOfBirth } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If user exists, return an error
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        // Create a new user
        const newUser = new User({
            name,
            surname,
            email,
            dateOfBirth,
        });

        // Save new user to the database
        await newUser.save();

        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        // Handle any errors
        res.status(409).json({ message: error.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Respond with the list of users
        res.status(200).json(users);
    } catch (error) {
        // Handle any errors
        res.status(404).json({ message: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, dateOfBirth } = req.body;

        if (email) {
            // Check if the new email is already in use
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                // If email is in use, return an error
                res.status(400).json({ message: "Email already in use" });
                return;
            }
        }

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            // If user not found, return an error
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Update user fields if provided
        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (email) user.email = email;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;

        // Save the updated user to the database
        await user.save();

        // Respond with the updated user
        res.status(200).json(user);
    } catch (error) {
        // Handle any errors
        res.status(409).json({ message: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            // If user not found, return an error
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Respond with the deleted user
        res.status(200).json(deletedUser);
    } catch (error) {
        // Handle any errors
        res.status(409).json({ message: error.message });
    }
};
