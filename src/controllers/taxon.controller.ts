import type { Request, Response } from 'express'
import { taxonService } from '../services/taxon.service.js'

export const createTaxon = async (req: Request, res: Response) => {
  
  
  console.log(res.locals.user.id);

  // const taxon = await taxonService.create(req.body, userId)

  res.status(201).json({
    status: 'success',
    data: "jalando ando <taxon>"
  })
}