import { Router } from "express";
import {
    getAdmins,
    loginAdmin,
    registerAdmin,
} from "../controllers/authController.js";
import validateAdmin from "../middleware/validateAdmin.js";
import { validateJwt } from "../middleware/validateJwt.js";

const router = Router();

router.post("/register", validateAdmin, registerAdmin);
router.post("/login", loginAdmin);
router.get("/admins", validateJwt, getAdmins);

export default router;
