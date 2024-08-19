import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from "../controllers/userController.js";
import { validateId } from "../middleware/validateId.js";
import validateUser from "../middleware/validateUser.js";

const router = Router();

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.put("/:id", validateId, validateUser, updateUser);
router.delete("/:id", validateId, deleteUser);

export default router;
