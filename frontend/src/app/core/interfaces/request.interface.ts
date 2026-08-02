export interface CreateAnalysisRequest {
  company: string;
  jobTitle: string;
  jobDescription: string;
  cvFile: File | null;
}