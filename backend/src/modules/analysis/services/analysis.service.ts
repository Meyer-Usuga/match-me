import { AnalysisStatus } from "@prisma/client";
import { CreateAnalysisDto } from "../dtos/create-analysis.dto";
import { AnalysisRepository } from "../repositories/analysis.respository";
import { CreateAnalysisData } from "../dtos/create-analysis.data";

export class AnalysisService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  public async create(dto: CreateAnalysisDto) {
    const analysisData: CreateAnalysisData = {
      userId: dto.userId,
      company: dto.company,
      jobTitle: dto.jobTitle,
      jobDescription: dto.jobDescription,
      cvText: "",
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      aiResult: {},
      status: AnalysisStatus.PENDING,
      errorMessage: undefined,
    };

    return await this.analysisRepository.create(analysisData);
  }
}
