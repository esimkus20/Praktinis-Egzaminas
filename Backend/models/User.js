import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
);

export default mongoose.model("User", userSchema);
