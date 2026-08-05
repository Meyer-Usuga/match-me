import express from "express";
import authRoutes from "@modules/auth/routes/auth.routes";
import analysisRoutes from "@/modules/analysis/routes/analysis.routes";
import { errorMiddleware } from "@/middlewares/error.middleware";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://match-me.vercel.app'
  ],
  credentials: true,
}));
app.use(express.json());
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/analysis", analysisRoutes);

app.use(errorMiddleware);

export default app; 