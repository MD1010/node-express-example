import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { errorHandler } from "../helpers/errorHandler";

export abstract class GenericCrudController<T extends Document> {
  constructor(private dbEntity: DbEnity<T>) {}
  createEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.create(req.body));
  });

  getEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.findById(req.params.id));
  });

  updateEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.updateOne(req.params.id, req.body));
  });

  deleteEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.deleteOne(req.params.id));
  });

  getAllEntities = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.findAll());
  });
}
