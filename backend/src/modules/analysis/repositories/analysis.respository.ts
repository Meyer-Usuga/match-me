import { prisma } from "@database/prisma";
import { CreateAnalysisData } from "../dtos/create-analysis.data";

export class AnalysisRepository {
  public async create(data: CreateAnalysisData) {
    return await prisma.analysis.create({
      data: {
        userId: data.userId,
        company: data.company,
        jobTitle: data.jobTitle,
        jobDescription: data.jobDescription,
        cvText: data.cvText,
        score: data.score,
        matchedSkills: data.matchedSkills,
        missingSkills: data.missingSkills,
        aiResult: data.aiResult,
        status: data.status,
        errorMessage: data.errorMessage,
      },
    });
  }
  public async findById(id: string) {}
  public async update(id: string, data: Partial<CreateAnalysisData>) {}
}
