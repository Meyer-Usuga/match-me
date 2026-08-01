import { AnalysisStatus } from "@prisma/client";
import { CreateAnalysisDto } from "../dtos/create-analysis.dto";
import { AnalysisRepository } from "../repositories/analysis.respository";
import { CreateAnalysisData } from "../dtos/create-analysis.data";
import { SkillExtractionService } from "./skills-extraction.service";
import { PdfService } from "./pdf.service"; 

export class AnalysisService {
  constructor(
    private readonly analysisRepository: AnalysisRepository,
    private readonly pdfService: PdfService,
    private readonly skillExtractionService: SkillExtractionService,
  ) {}

  public async create(dto: CreateAnalysisDto) {
    const cvText = await this.pdfService.extractText(dto.cvFile); 
    const matchedSkills = this.skillExtractionService.extractSkills(cvText);

    const analysisData: CreateAnalysisData = {
      userId: dto.userId,
      company: dto.company,
      jobTitle: dto.jobTitle,
      jobDescription: dto.jobDescription,
      cvText,
      score: 0,
      matchedSkills,
      missingSkills: [],
      aiResult: {},
      status: AnalysisStatus.PENDING,
      errorMessage: undefined,
    };

    return await this.analysisRepository.create(analysisData);
  }
}
