export interface CreateAnalysisRequest {
  company: string;
  jobTitle: string;
  jobDescription: string;
  cvFile: File | null;
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
  aiResult: string[];
  status: string;
  errorMessage?: string;
}