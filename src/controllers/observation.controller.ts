import type { Request, Response } from "express"

import * as observationService from "../services/observation.service.js";
import { getPagination } from "../utils/Pagination.js";

export const createObservation = async (req: Request, res: Response) => {
    const { user } = res.locals;

    const observation = await observationService.createObservationService(
      req.body,
      user.id
    );

    res.status(201).json({
      status: "success",
      data: {
        observation
      }
    });
};

export const getAllObservations = async (req: Request, res: Response) => {
  const { page, limit, skip } = getPagination(req.query);

  const result = await observationService.getAllObservations({
    page,
    limit,
    skip
  });

  res.json({
    status: "success",
    data: result.items,
    meta: result.meta
  })
};

/*export const getObservationsMap = async (req, res) => {

  try {
    const { swLat, swLng, neLat, neLng } = req.query;

    const data = await service.getObservationsInAreaService({
      swLat: Number(swLat),
      swLng: Number(swLng),
      neLat: Number(neLat),
      neLng: Number(neLng)
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};*/