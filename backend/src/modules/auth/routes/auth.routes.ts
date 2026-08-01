import { Router } from "express";
import { AuthController } from "@modules/auth/controllers/auth.controller";
import { AuthService } from "@modules/auth/services/auth.service";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { TokenService } from "../services/token.service";

const router = Router();

const tokenService = new TokenService();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository, tokenService);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
