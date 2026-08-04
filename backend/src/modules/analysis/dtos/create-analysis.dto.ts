export interface CreateAnalysisDto {
  userId?: string;
  company?: string;
  jobTitle?: string;
  jobDescription: string;
  cvFile?: Express.Multer.File;
  useLastCv?: boolean;
}
