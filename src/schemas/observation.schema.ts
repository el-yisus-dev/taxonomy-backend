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