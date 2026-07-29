import { Router } from "express"; 
import { AuthController } from "@modules/auth/controllers/auth.controller";
import { AuthService } from "@modules/auth/services/auth.service";
import { UserRepository } from "@/modules/users/repositories/user.repository";

const router = Router(); 


const userRepository = new UserRepository(); 
const authService = new AuthService(userRepository); 
const authController = new AuthController(authService);

router.post("/register", authController.register);

export default router; 
