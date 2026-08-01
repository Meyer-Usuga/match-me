export interface GeminiAnalysisInput {
  score: number,
  jobSkills: string[],
  cvSkills: string[],
  matchedSkills: string[],
  missingSkills: string[],
  jobDescription: string,
  cvText: string,
}