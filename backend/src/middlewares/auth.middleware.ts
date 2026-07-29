import { TokenService } from "@/modules/auth/services/token.service";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { AppError } from "@/utils/errors/app-error";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository
  ) {}

  public authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError({
        message: "Missing token",
        statusCode: 401,
      });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        throw new AppError({
            message: "Missing token",
            statusCode: 401,
        })
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

    next();
  };
}