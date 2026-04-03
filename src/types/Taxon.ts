export const hierarchy = [
  'DOMAIN',
  'KINGDOM',
  'PHYLUM',
  'CLASS',
  'ORDER',
  'FAMILY',
  'GENUS',
  'SPECIES'
] as const

export type TaxonRank = typeof hierarchy[number];

export interface CreateTaxonDTO {
  name: string
  rank: TaxonRank
  createdBy: number
  parentId?: number | null
  description?: string | null
}

export enum TaxaStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  REJECTED = "REJECTED",
}

export type UpdateTaxonDTO = {
  name?: string;
  rank?: TaxonRank;
  parentId?: number | null;
  description?: string | null;
};