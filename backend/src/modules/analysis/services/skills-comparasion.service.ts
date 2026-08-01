export class SkillComparasionService {
  public compareSkills(cvSkills: string[], jobSkills: string[]) {
    const cvSet = new Set(cvSkills);

    const matchedSkills = jobSkills.filter((skill) => cvSet.has(skill));
    const missingSkills = jobSkills.filter((skill) => !cvSet.has(skill));

    return {
      matchedSkills,
      missingSkills,
    };
  }
}
