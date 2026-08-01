import { SKILL_CATALOG } from "../constants/skills/skill-catalog";

export class SkillExtractionService {
  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  public extractSkills(text: string): string[] {
    const foundSkills = new Set<string>();

    const normalizedText = text.toLowerCase();

    for (const skill of SKILL_CATALOG) {
      const matched = skill.aliases.some((alias) => {
        const escapedAlias = this.escapeRegex(alias.toLowerCase());

        const regex = new RegExp(`\\b${escapedAlias}\\b`, "i");

        return regex.test(normalizedText);
      });

      if (matched) {
        foundSkills.add(skill.name);
      }
    }

    return [...foundSkills];
  }
}
