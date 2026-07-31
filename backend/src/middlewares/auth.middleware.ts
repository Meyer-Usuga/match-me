import { TokenService } from "@/modules/auth/services/token.service";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { AppError } from "@/utils/errors/app-error";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  private authenticate = async (
    req: Request,
    requireAuth: boolean,
  ): Promise<void> => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      // Skip verification (no login required)
      if (!requireAuth) {
        return;
      }

      throw new AppError({
        message: "Invalid or missing authorization header",
        statusCode: 401,
      });
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      throw new AppError({
        message: "Missing token",
        statusCode: 401,
      });
    }

    const { userId } = this.tokenService.verifyToken(token);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError({
        message: "User not found",
        statusCode: 404,
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };

  public required = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.authenticate(req, true);
      next();
    } catch (error) {
      next(error);
    }
  };

  public optional = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.authenticate(req, false);
      next();
    } catch (error) {
      next(error);
    }
  };
}
