-- CreateEnum
CREATE TYPE "ObservationStatus" AS ENUM ('CASUAL', 'NEEDS_ID', 'IDENTIFIED');

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "placeName" TEXT,
    "status" "ObservationStatus" NOT NULL DEFAULT 'NEEDS_ID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservationImage" (
    "id" SERIAL NOT NULL,
    "observationId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "providerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservationImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Observation_userId_idx" ON "Observation"("userId");

-- CreateIndex
CREATE INDEX "Observation_latitude_idx" ON "Observation"("latitude");

-- CreateIndex
CREATE INDEX "Observation_longitude_idx" ON "Observation"("longitude");

-- CreateIndex
CREATE INDEX "Observation_observedAt_idx" ON "Observation"("observedAt");

-- CreateIndex
CREATE INDEX "Observation_status_idx" ON "Observation"("status");

-- CreateIndex
CREATE INDEX "ObservationImage_observationId_idx" ON "ObservationImage"("observationId");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservationImage" ADD CONSTRAINT "ObservationImage_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "Observation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
