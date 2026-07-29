import { AppError } from "@/utils/errors/app-error";
import type { StringValue } from "ms";
import jwt from "jsonwebtoken";

interface GenerateTokenArgs {
  userId: string;
}

interface VerifyTokenResponse {
  userId: string;
}

export class TokenService {
  public generateToken(args: GenerateTokenArgs): string {
    const { userId } = args;

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

    if (!jwtSecret) {
      throw new AppError({
        message: "JWT_SECRET not defined",
        statusCode: 500,
      });
    }

    if (!jwtExpiresIn) {
      throw new AppError({
        message: "JWT_EXPIRES_IN not defined",
        statusCode: 500,
      });
    }

    const token = jwt.sign({ sub: userId }, jwtSecret as jwt.Secret, {
      expiresIn: jwtExpiresIn as StringValue,
    });

    return token;
  }

  public verifyToken(token: string): VerifyTokenResponse {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new AppError({
        message: "JWT_SECRET not defined",
        statusCode: 500,
      });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret as jwt.Secret) as {
        sub: string;
      };
      return { userId: decoded.sub };
    } catch (error) {
      throw new AppError({
        message: "Invalid token",
        statusCode: 401,
      });
    }
  }
}
