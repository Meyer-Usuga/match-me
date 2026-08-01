import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { body } = req;

      const user = await this.authService.register(body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { body } = req;

      const user = await this.authService.login(body);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
