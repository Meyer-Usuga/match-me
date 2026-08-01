import { GeminiAnalysisInput } from "../types/gemini-analysis-input";

export class PromptBuilderService {
  public buildAnalysisPrompt(data: GeminiAnalysisInput) {
    const {
      score,
      jobSkills,
      cvSkills,
      matchedSkills,
      missingSkills,
      jobDescription,
      cvText,
    } = data;

    return `
        Eres un reclutador técnico senior especializado en selección de desarrolladores de software.

        Analiza la compatibilidad entre el CV y la vacante utilizando únicamente la información proporcionada.

        Reglas:

        - No recalcules el score.
        - No vuelvas a extraer habilidades.
        - No inventes experiencia.
        - No asumas conocimientos que no aparecen.
        - Basa todas las conclusiones en la información suministrada.
        - Las recomendaciones deben ser concretas y accionables.

        Información calculada por el sistema:

        Score:
        ${score}%

        Habilidades del CV:
        ${cvSkills.join(", ")}

        Habilidades requeridas:
        ${jobSkills.join(", ")}

        Coinciden:
        ${matchedSkills.join(", ")}

        Faltan:
        ${missingSkills.join(", ")}

        Resumen del CV:

        ${cvText}

        Descripción de la vacante:

        ${jobDescription}
    `;
  }
}
