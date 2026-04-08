import type { Request, Response } from 'express';

import * as taxonService from '../services/taxon.service.js';
import { getPagination } from '../utils/Pagination.js';
import { parseArray } from '../lib/convertArray.js';

export const createTaxon = async (req: Request, res: Response) => {
  
  const { id } = res.locals.user;

  const taxon = await taxonService.createTaxon(req.body, id)

  res.status(201).json({
    status: 'success',
    data: {
      taxon
    }
  })
};

export const getAllTaxons = async (req: Request, res: Response) => {
  const { page, limit, skip } = getPagination(req.query);

  const { rank, status, parentId, include } = req.query as any;

  const includeCreator = include === "creator";

  const parsedParentId =
    parentId === undefined
      ? undefined
      : parentId === "null"
      ? null
      : Number(parentId);

  const statusArray = parseArray(status);
  const rankArray = parseArray(rank);

  const filters: any = {
    page,
    limit,
    skip,
  };

  if (parsedParentId !== undefined) {
    filters.parentId = parsedParentId;
  }

  if (includeCreator) {
    filters.includeCreator = true;
  }

  if (rankArray?.length) {
    filters.rank = rankArray;
  }

  if (statusArray?.length) {
    filters.status = statusArray;
  }

  const result = await taxonService.getAllTaxons(filters);

  res.json({
    status: "success",
    data: result.items,
    meta: result.meta,
  });
};

export const updateTaxon = async (req: Request, res: Response) => {
  const id  = Number(req.params.id);
  const { user } = res.locals;

  await taxonService.updateTaxon(id, req.body, user);
    
  return res.json({
    status: "success",
    data: {
        message: "Taxon updated sucessfully",
      }
    })
};

export const getTaxonById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const taxa = await taxonService.getTaxonById(id);

  res.json({
    status: "success",
    data: taxa
  })
};

export const deleteTaxon =  async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const { user } = res.locals;

    await taxonService.deleteTaxa(id, user)
  
    res.status(200).json({
      status: "success",
      data: {
        message: "Taxa deleted successfully"
      }
    })
};

export const updateTaxaStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

   await taxonService.updateTaxaStatus(id, req.body);

   return res.json({
    status: "success",
    data: {
        message: "Taxon updated sucessfully",
      }
   });
};

export const updateTaxaParent = async (req: Request, res: Response) => {
   const id = Number(req.params.id);

   await taxonService.updateTaxaParent(id, req.body);

   return res.json({
    status: "success",
    data: {
        message: "Taxon updated sucessfully",
      }
   });
}