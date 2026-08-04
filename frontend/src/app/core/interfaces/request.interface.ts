import { User } from "./user.interface";

export interface CreateAnalysisRequest {
  company: string;
  jobTitle: string;
  jobDescription: string;
  cvFile: File | null;
  useLastCv?: boolean;
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

export interface CreatedUserAnalysisResponse {
  id: string;
  jobTitle: string;
  company: string;
  score: number;
  date: string;
}

export interface AnalysisDetailResponse {
  id: string;
  company?: string;
  jobTitle?: string;
  jobDescription: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiResult: AiResult;
  status: string;
  date: string;
}

export type RegisterRequest = Pick<User, 'email' | 'password' | 'confirmPassword' |  'name'>

export type LoginRequest = Pick<User, 'email' | 'password'>

export interface RegisterResponse {
  name: string;
  email: string;
  accessToken: string;
  countAnalisis: number;
}

export interface LoginUserResponse {
  name: string;
  email: string;
  accessToken: string;
  countAnalisis: number;
}
