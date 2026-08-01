import { Type } from "@google/genai";

export const GEMINI_RESPONSE_SCHEMA = {
  type: Type.OBJECT,

  properties: {
    summary: {
      type: Type.STRING,
    },

    strengths: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    weaknesses: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    improvementPriority: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },
  },

  required: [
    "summary",
    "strengths",
    "weaknesses",
    "recommendations",
    "improvementPriority",
  ],
};
