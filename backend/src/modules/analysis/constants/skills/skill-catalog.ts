import { FRONTEND_SKILLS } from "./frontend-skills";
import { BACKEND_SKILLS } from "./backend-skills";
import { DATABASE_SKILLS } from "./databases-skills";
import { DEVOPS_SKILLS } from "./devops-skills";
import { CLOUD_SKILLS } from "./cloud-skills";
import { TESTING_SKILLS } from "./testing-skills";
import { MOBILE_SKILLS } from "./mobile-skills";
import { TOOLS_SKILLS } from "./tools-skills";
import { ARCHITECTURE_SKILLS } from "./architecture-skills";
import { SkillDefinition } from "../../types/skill-definition"

export const SKILL_CATALOG: SkillDefinition[] = [
  ...FRONTEND_SKILLS,
  ...BACKEND_SKILLS,
  ...DATABASE_SKILLS,
  ...DEVOPS_SKILLS,
  ...CLOUD_SKILLS,
  ...TESTING_SKILLS,
  ...MOBILE_SKILLS,
  ...TOOLS_SKILLS,
  ...ARCHITECTURE_SKILLS,
];