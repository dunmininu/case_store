-- CreateIndex
CREATE INDEX "DeviceBrand_name_idx" ON "DeviceBrand"("name");

-- CreateIndex
CREATE INDEX "DeviceModel_name_deviceBrandId_idx" ON "DeviceModel"("name", "deviceBrandId");

-- CreateIndex
CREATE INDEX "DeviceModel_basePrice_idx" ON "DeviceModel"("basePrice");
