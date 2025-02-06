-- CreateTable
CREATE TABLE "DeviceBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DeviceBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deviceBrandId" TEXT NOT NULL,

    CONSTRAINT "DeviceModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceBrand_name_key" ON "DeviceBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceModel_name_deviceBrandId_key" ON "DeviceModel"("name", "deviceBrandId");

-- AddForeignKey
ALTER TABLE "DeviceModel" ADD CONSTRAINT "DeviceModel_deviceBrandId_fkey" FOREIGN KEY ("deviceBrandId") REFERENCES "DeviceBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
