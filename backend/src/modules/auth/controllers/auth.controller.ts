import { Request, Response } from "express"; 
import { AuthService } from "../services/auth.service";

export class AuthController { 
    constructor(private readonly authService: AuthService) {}

    public register = async (
        req: Request, 
        res: Response
    ): Promise<Response> => {
            
        const { body } = req; 
        
        const user = await this.authService.register(body);

        return res.status(201).json(user); 
    }
}