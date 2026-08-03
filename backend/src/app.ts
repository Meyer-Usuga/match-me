import express from "express";
import authRoutes from "@modules/auth/routes/auth.routes";
import analysisRoutes from "@/modules/analysis/routes/analysis.routes";
import { errorMiddleware } from "@/middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/analysis", analysisRoutes);

app.use(errorMiddleware);

export default app; 