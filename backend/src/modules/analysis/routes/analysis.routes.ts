import { Router } from "express";
import { AnalysisController } from "@modules/analysis/controllers/analysis.controller";
import { AnalysisService } from "@modules/analysis/services/analysis.service";
import { AnalysisRepository } from "@modules/analysis/repositories/analysis.respository";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { TokenService } from "@/modules/auth/services/token.service";
import { PdfService } from "@modules/analysis/services/pdf.service";
import { ScoreService } from "@modules/analysis/services/score.service";
import { SkillExtractionService } from "@modules/analysis/services/skills-extraction.service";
import { SkillComparasionService } from "@modules/analysis/services/skills-comparasion.service";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { MulterMiddleware } from "@/middlewares/multer.middlware";
import { GeminiService } from "@modules/analysis/services/gemini.service";
import { PromptBuilderService } from "@modules/analysis/services/prompt-builder.service";

const router = Router();

const tokenService = new TokenService();

const pdfService = new PdfService();

const scoreService = new ScoreService();

const skillExtractionService = new SkillExtractionService();

const skillComparasionService = new SkillComparasionService();

const geminiService = new GeminiService();

const promptBuilderService = new PromptBuilderService();

const userRepository = new UserRepository();

const authMiddleware = new AuthMiddleware(tokenService, userRepository);

const analysisRepository = new AnalysisRepository();

const analysisService = new AnalysisService(
  analysisRepository,
  pdfService,
  scoreService,
  skillExtractionService,
  skillComparasionService,
  geminiService,
  promptBuilderService,
);

const analysisController = new AnalysisController(analysisService);

const multerMiddleware = new MulterMiddleware();

router.post(
  "/",
  authMiddleware.optional,
  multerMiddleware.upload.single("cv"),
  analysisController.create,
);

export default router;
