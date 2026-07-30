/*
  Warnings:

  - You are about to drop the column `summary` on the `analyses` table. All the data in the column will be lost.
  - Added the required column `jobDescription` to the `analyses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "analyses" DROP CONSTRAINT "analyses_userId_fkey";

-- AlterTable
ALTER TABLE "analyses" DROP COLUMN "summary",
ADD COLUMN     "aiResult" JSONB,
ADD COLUMN     "cvText" TEXT,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "matchedSkills" JSONB,
ADD COLUMN     "missingSkills" JSONB,
ADD COLUMN     "status" "AnalysisStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
