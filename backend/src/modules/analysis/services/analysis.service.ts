import { AnalysisStatus, Prisma } from "@prisma/client";
import { CreateAnalysisDto } from "../dtos/create-analysis.dto";
import { AnalysisRepository } from "../repositories/analysis.respository";
import { CreateAnalysisData } from "../dtos/create-analysis.data";
import { SkillExtractionService } from "./skills-extraction.service";
import { SkillComparasionService } from "./skills-comparasion.service";
import { PromptBuilderService } from "./prompt-builder.service";
import { GeminiService } from "./gemini.service";
import { PdfService } from "./pdf.service";
import { ScoreService } from "./score.service";

export class AnalysisService {
  constructor(
    private readonly analysisRepository: AnalysisRepository,
    private readonly pdfService: PdfService,
    private readonly scoreService: ScoreService,
    private readonly skillExtractionService: SkillExtractionService,
    private readonly skillComparasionService: SkillComparasionService,
    private readonly geminiService: GeminiService,
    private readonly promptBuilderService: PromptBuilderService,
  ) {}

  public async create(dto: CreateAnalysisDto) {
    const cvText = await this.pdfService.extractText(dto.cvFile);
    const cvSkills = this.skillExtractionService.extractSkills(cvText);
    const jobSkills = this.skillExtractionService.extractSkills(
      dto.jobDescription,
    );
    const comparison = this.skillComparasionService.compareSkills(
      cvSkills,
      jobSkills,
    );
    const score = this.scoreService.calculateScore(
      jobSkills.length,
      comparison.matchedSkills.length,
      comparison.missingSkills.length,
    );
    const prompt = this.promptBuilderService.buildAnalysisPrompt({
      score: score.total,
      cvSkills,
      jobSkills,
      matchedSkills: comparison.matchedSkills,
      missingSkills: comparison.missingSkills,
      jobDescription: dto.jobDescription,
      cvText,
    });
    const aiResult = await this.geminiService.generate(prompt);

    if (!dto.userId) {
      return {
        score: score.total,
        matchedSkills: comparison.matchedSkills,
        missingSkills: comparison.missingSkills,
        aiResult: aiResult as unknown as Prisma.InputJsonValue,
        status: AnalysisStatus.COMPLETED,
      };
    }

    const analysisData: CreateAnalysisData = {
      userId: dto.userId,
      company: dto.company,
      jobTitle: dto.jobTitle,
      jobDescription: dto.jobDescription,
      cvText,
      score: score.total,
      matchedSkills: comparison.matchedSkills,
      missingSkills: comparison.missingSkills,
      aiResult: aiResult as unknown as Prisma.InputJsonValue,
      status: AnalysisStatus.COMPLETED,
      errorMessage: undefined,
    };

    return await this.analysisRepository.create(analysisData);
  }
}
