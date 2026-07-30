import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { AppError } from "@/utils/errors/app-error";

export class MulterMiddleware {

  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly maxFiles = 1;

  public readonly upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: this.maxFileSize,
      files: this.maxFiles,
    },
    fileFilter: (
      _req: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ) => {
      if (file.mimetype !== "application/pdf") {
        return callback(
          new AppError({
            message: "Only PDF files are allowed!",
            statusCode: 400,
          }),
        );
      }

      callback(null, true);
    },
  });
}
