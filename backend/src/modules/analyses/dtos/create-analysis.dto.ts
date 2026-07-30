import { AnalysisStatus } from "@prisma/client";

export interface CreateAnalysisDto {
    userId?: string; 
    company?: string; 
    jobTitle?: string;
    jobDescription: string;
    cvFile: Express.Multer.File;  
    cvText?: string;
    score?: number; 
    matchedSkills?: string[]; 
    missingSkills?: string[];
    aiResult?: unknown;
    status?: AnalysisStatus; 
    errorMessage?: string;
}
