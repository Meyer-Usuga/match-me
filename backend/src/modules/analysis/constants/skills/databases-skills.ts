import { SkillDefinition } from "../../types/skill-definition";

export const DATABASE_SKILLS: SkillDefinition[] = [
  { name: "PostgreSQL", aliases: ["postgres", "postgresql"] },
  { name: "MySQL", aliases: ["mysql"] },
  { name: "MariaDB", aliases: ["mariadb"] },
  { name: "SQL Server", aliases: ["sql server", "mssql"] },
  { name: "Oracle", aliases: ["oracle"] },
  { name: "SQLite", aliases: ["sqlite"] },

  { name: "MongoDB", aliases: ["mongodb", "mongo"] },
  { name: "Redis", aliases: ["redis"] },
  { name: "Firebase", aliases: ["firebase"] },
  { name: "Supabase", aliases: ["supabase"] },

  { name: "Prisma", aliases: ["prisma"] },
  { name: "TypeORM", aliases: ["typeorm"] },
  { name: "Sequelize", aliases: ["sequelize"] },
  { name: "Mongoose", aliases: ["mongoose"] },
];
