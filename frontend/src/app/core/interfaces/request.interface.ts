export interface CreateAnalysisRequest {
  company: string;
  jobTitle: string;
  jobDescription: string;
  cvFile: File | null;
}

export interface AiResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  improvementPriority: string[];
}

export interface CreatedAnalysisResponse {
  userId?: string;
  company?: string;
  jobTitle?: string;
  jobDescription: string;
  cvText: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiResult: AiResult;
  status: string;
  errorMessage?: string;
}