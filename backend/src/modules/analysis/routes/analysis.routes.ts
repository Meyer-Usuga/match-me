import { Router } from "express";

import { AnalysisController } from "@modules/analysis/controllers/analysis.controller";
import { AnalysisService } from "@modules/analysis/services/analysis.service";
import { AnalysisRepository } from "@modules/analysis/repositories/analysis.respository";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { TokenService } from "@/modules/auth/services/token.service";
import { PdfService } from "@modules/analysis/services/pdf.service";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { MulterMiddleware } from "@/middlewares/multer.middlware";

const router = Router();

const tokenService = new TokenService();

const pdfService = new PdfService();

const userRepository = new UserRepository();

const authMiddleware = new AuthMiddleware(tokenService, userRepository);

const analysisRepository = new AnalysisRepository();

const analysisService = new AnalysisService(analysisRepository, pdfService);

const analysisController = new AnalysisController(analysisService);

const multerMiddleware = new MulterMiddleware();

router.post(
  "/",
  authMiddleware.optional,
  multerMiddleware.upload.single("cv"),
  analysisController.create,
);

export default router;
