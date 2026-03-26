-- CreateEnum
CREATE TYPE "TaxonRank" AS ENUM ('DOMAIN', 'KINGDOM', 'PHYLUM', 'CLASS', 'ORDER', 'FAMILY', 'GENUS', 'SPECIES');

-- CreateEnum
CREATE TYPE "ValidationStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED');

-- CreateTable
CREATE TABLE "Taxon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rank" "TaxonRank" NOT NULL,
    "parentId" INTEGER,
    "description" TEXT,
    "validationStatus" "ValidationStatus" NOT NULL DEFAULT 'PENDING',
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Taxon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Taxon_parentId_idx" ON "Taxon"("parentId");

-- CreateIndex
CREATE INDEX "Taxon_rank_idx" ON "Taxon"("rank");

-- CreateIndex
CREATE INDEX "Taxon_name_idx" ON "Taxon"("name");

-- AddForeignKey
ALTER TABLE "Taxon" ADD CONSTRAINT "Taxon_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Taxon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taxon" ADD CONSTRAINT "Taxon_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
