/*
  Warnings:

  - Added the required column `updatedAt` to the `PriceCalculationLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceCalculationLog" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "PriceCalculationLog_createdAt_idx" ON "PriceCalculationLog"("createdAt");

-- CreateIndex
CREATE INDEX "PriceCalculationLog_deviceModelId_idx" ON "PriceCalculationLog"("deviceModelId");
