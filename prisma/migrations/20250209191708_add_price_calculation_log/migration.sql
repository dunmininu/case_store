-- CreateTable
CREATE TABLE "PriceCalculationLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceModelId" TEXT NOT NULL,
    "caseType" TEXT NOT NULL,
    "hasPremiumFinish" BOOLEAN NOT NULL,
    "country" TEXT NOT NULL,
    "calculatedAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "PriceCalculationLog_pkey" PRIMARY KEY ("id")
);
