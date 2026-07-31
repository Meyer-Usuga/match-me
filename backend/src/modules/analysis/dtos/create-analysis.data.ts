import { AnalysisStatus, Prisma } from "@prisma/client";

export interface CreateAnalysisData {
  userId?: string;
  company?: string;
  jobTitle?: string;
  jobDescription: string;
  cvText: string;
  score: number;
  matchedSkills: Prisma.InputJsonValue;
  missingSkills: Prisma.InputJsonValue;
  aiResult: Prisma.InputJsonValue;
  status: AnalysisStatus;
  errorMessage?: string;
}