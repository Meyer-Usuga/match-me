import { AppError } from "@/utils/errors/app-error";
import type { StringValue } from "ms";
import jwt from "jsonwebtoken";

interface GenerateTokenArgs {
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
                statusCode: 500
            });
        }

        if (!jwtExpiresIn) {
            throw new AppError({
                message: "JWT_EXPIRES_IN not defined",
                statusCode: 500
            });
        }

        const token = jwt.sign(
            { sub: userId },
            jwtSecret as jwt.Secret,
            { expiresIn: jwtExpiresIn as StringValue }
        );

        return token;
    }

}