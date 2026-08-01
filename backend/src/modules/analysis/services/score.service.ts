import { AnalysisScoreResult } from "../types/analysis-score-result";

export class ScoreService {
  public calculateScore(
    totalSkills: number,
    matchedSkills: number,
    missingSkills: number,
  ): AnalysisScoreResult {
    if (totalSkills === 0) {
      return { total: 0, matched: 0, missing: 0 };
    }

    const total = Math.round((matchedSkills / totalSkills) * 100);

    return {
      total,
      matched: matchedSkills,
      missing: missingSkills,
    };
  }
}