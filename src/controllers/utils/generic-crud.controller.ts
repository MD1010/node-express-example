import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../../dal/genric-entity.dal";
import { errorHandler } from "../../utils/errorHandler";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}
  protected getAllEntites = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(await this.dbEntity.findAll());
    }
  );

  protected createEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.create(req.body));
  });

  protected getEntityById = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(await this.dbEntity.findOne({ id: req.params.id }));
    }
  );

  protected findEntityByFilter = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(await this.dbEntity.findOne(req.body));
    }
  );

  protected updateEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.updateOne(req.params.id, req.body));
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.deleteOne(req.params.id));
  });
}
