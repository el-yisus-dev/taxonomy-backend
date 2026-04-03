export const TAXON = {
  Taxon: {
    type: "object",
    description: "Represents a taxonomic entity in the system",
    properties: {
      id: {
        type: "integer",
        description: "Unique identifier of the taxon",
        example: 1
      },
      name: {
        type: "string",
        description: "Scientific name of the taxon",
        example: "Animalia"
      },
      description: {
        type: "string",
        nullable: true,
        description: "Optional description of the taxon",
        example: "Kingdom of animals"
      },
      rank: {
        type: "string",
        description: "Taxonomic rank of the entity",
        enum: ["DOMAIN", "KINGDOM", "PHYLUM", "CLASS", "ORDER", "FAMILY", "GENUS", "SPECIES"],
        example: "KINGDOM"
      },
      parentId: {
        type: "integer",
        nullable: true,
        description: "ID of the parent taxon",
        example: null
      },
      createdBy: {
        type: "integer",
        description: "ID of the user who created this taxon",
        example: 1
      },
      validationStatus: {
        type: "string",
        description: "Validation status of the taxon",
        enum: ["PENDING", "APPROVED", "REJECTED"],
        example: "PENDING"
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Creation timestamp",
        example: "2026-03-10T10:00:00Z"
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Last update timestamp",
        example: "2026-03-10T10:00:00Z"
      }
    }
  },

  CreateTaxon: {
    type: "object",
    description: "Payload required to create a new taxon",
    required: ["name", "rank"],
    properties: {
      name: {
        type: "string",
        description: "Scientific name of the taxon",
        example: "Animalia"
      },
      description: {
        type: "string",
        nullable: true,
        description: "Optional description of the taxon",
        example: "Kingdom of animals"
      },
      rank: {
        type: "string",
        description: "Taxonomic rank",
        enum: ["DOMAIN", "KINGDOM", "PHYLUM", "CLASS", "ORDER", "FAMILY", "GENUS", "SPECIES"],
        example: "KINGDOM"
      },
      parentId: {
        type: "integer",
        nullable: true,
        description: "Optional parent taxon ID",
        example: null
      }
    }
  },

  UpdateTaxon: {
    type: "object",
    description: "Payload used to update a taxon",
    properties: {
      name: {
        type: "string",
        description: "Updated scientific name",
        example: "Plantae"
      },
      description: {
        type: "string",
        nullable: true,
        description: "Updated description",
        example: "Kingdom of plants"
      },
      rank: {
        type: "string",
        description: "Updated taxonomic rank",
        enum: ["DOMAIN", "KINGDOM", "PHYLUM", "CLASS", "ORDER", "FAMILY", "GENUS", "SPECIES"],
        example: "KINGDOM"
      },
      parentId: {
        type: "integer",
        nullable: true,
        description: "Updated parent taxon ID",
        example: 2
      }
    }
  }
};