/*
  Warnings:

  - A unique constraint covering the columns `[name,parentId]` on the table `Taxon` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Taxon_name_rank_key";

-- CreateIndex
CREATE UNIQUE INDEX "Taxon_name_parentId_key" ON "Taxon"("name", "parentId");
