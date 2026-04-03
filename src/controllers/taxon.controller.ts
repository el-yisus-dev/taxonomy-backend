import type { Request, Response } from 'express';

import * as taxonService from '../services/taxon.service.js';
import { getPagination } from '../utils/Pagination.js';

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
  
  const parentId = req.query.parentId === 'null' ? 
    null : 
    req.query.parentId !== undefined  
      ? Number(req.query.parentId) 
      : undefined
  
  const includeCreator = req.query.include === 'creator';

  const result = await taxonService.getAllTaxons({
      page,
      limit,
      skip,
      parentId,
      includeCreator
    })
  
    res.json({
      status: "success",
      data: result.items,
      meta: result.meta
    })
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
}

export const getTaxonById = () => {
  
}

export const deleteTaxon = () => {

}
