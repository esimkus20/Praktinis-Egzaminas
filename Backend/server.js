import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

mongoose
    .connect(MONGO_URI, { dbName: "EventRegistrationApp" })
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Failed connect to MongoDB"));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
