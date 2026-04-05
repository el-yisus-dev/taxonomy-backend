/*
  Warnings:

  - A unique constraint covering the columns `[name,rank]` on the table `Taxon` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Taxon_name_idx";

-- DropIndex
DROP INDEX "Taxon_parentId_idx";

-- DropIndex
DROP INDEX "Taxon_rank_idx";

-- CreateIndex
CREATE INDEX "Taxon_parentId_rank_idx" ON "Taxon"("parentId", "rank");

-- CreateIndex
CREATE INDEX "Taxon_deletedAt_idx" ON "Taxon"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Taxon_name_rank_key" ON "Taxon"("name", "rank");
