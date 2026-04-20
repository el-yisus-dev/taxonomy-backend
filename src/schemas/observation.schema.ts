import { z } from "zod";

export const observationImageSchema = z.object({
  url: z
    .string()
    .url("La URL invalid"),

  providerId: z
    .string()
    .min(1, "providerId required")
    .optional()
});

export const createObservationSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .optional(),

  observedAt: z.coerce.date(),

  latitude: z
    .number()
    .min(-90, "Latitud inválida")
    .max(90, "Latitud inválida"),

  longitude: z
    .number()
    .min(-180, "Longitud inválida")
    .max(180, "Longitud inválida"),

  placeName: z
    .string()
    .trim()
    .optional(),

  images: z
    .array(observationImageSchema, { error: "Images are required"})
});

export const getObservationsMapSchema = z.object({
  swLat: z.coerce
    .number({
      error: "swLat must be a number"
    })
    .min(-90, "swLat must be greater than or equal to -90")
    .max(90, "swLat must be less than or equal to 90"),

  swLng: z.coerce
    .number({
      error: "swLng must be a number"
    })
    .min(-180, "swLng must be greater than or equal to -180")
    .max(180, "swLng must be less than or equal to 180"),

  neLat: z.coerce
    .number({
      error: "neLat must be a number"
    })
    .min(-90, "neLat must be greater than or equal to -90")
    .max(90, "neLat must be less than or equal to 90"),

  neLng: z.coerce
    .number({
      error: "neLng must be a number"
    })
    .min(-180, "neLng must be greater than or equal to -180")
    .max(180, "neLng must be less than or equal to 180"),

  limit: z.coerce
    .number({
      error: "limit must be a number"
    })
    .min(1, "limit must be at least 1")
    .max(500, "limit cannot exceed 500")
    .default(200)
});

export const getObservationsMapSchemaRefined =
  getObservationsMapSchema.refine(
    (data) => data.swLat < data.neLat && data.swLng < data.neLng,
    {
      message:
        "Invalid bounding box: southwest coordinates must be less than northeast coordinates",
      path: ["swLat"]
    }
  );