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

export const getObservationsMap = async (req: Request, res: Response) => {
  const { swLat, swLng, neLat, neLng, limit } = req.query;

  const data = await observationService.getObservationsMap({
    swLat,
    swLng,
    neLat,
    neLng,
    limit
  });

  res.json({
    status: "success",
    data
  });
};