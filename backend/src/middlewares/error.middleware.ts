import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/errors/app-error"; 

export function errorMiddleware(
    error: Error, 
    request: Request,
    response: Response, 
    _next: NextFunction
): Response {

    const baseError = {
        message: error.message,
        path: request.path,
        method: request.method,
        timestamp: new Date().toISOString(),
    }

    if (error instanceof AppError) {
        return response.status(error.statusCode).json(baseError);
    }

    console.error(error);

    return response.status(500).json({
        ...baseError,
        message: "Internal server error",
        ...(process.env.NODE_ENV === "development" && {
            stack: error.stack,
        }),
    }); 
}