import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/errors/app-error";
import { AnalysisService } from "../services/analysis.service";
import { CreateAnalysisDto } from "../dtos/create-analysis.dto";

export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.file) {
        throw new AppError({
          message: "CV file is required!",
          statusCode: 400,
        });
      }

      const dto: CreateAnalysisDto = {
        userId: req.user?.id,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        cvFile: req.file,
      };

      const analysis = await this.analysisService.create(dto);

      res.status(201).json({
        message: "Analysis created successfully!",
        data: analysis,
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserAnalyses = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user!.id;

      const analyses = await this.analysisService.getUserAnalyses(userId);

      res.status(200).json({
        message: "Analyses found successfully!",
        data: analyses,
      });
    } catch (error) {
      next(error);
    }
  };
}
