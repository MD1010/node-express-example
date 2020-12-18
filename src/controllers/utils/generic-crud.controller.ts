import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../../dal";
import { errorHandler } from "../../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  protected getAllEntites = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.find({}));
  });

  protected getEntityById = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.find({ _id: req.params.id }));
  });

  protected findEntityByFilter = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.find(req.body));
  });

  protected createEntity = errorHandler(async (req: Request, res: Response) => {
    const newEntity = await this.dbEntity.create(req.body);
    return res.json({ created: newEntity._id });
  });

  protected updateEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.updateOne(req.params.id, req.body);
    return res.json({ updated: req.params.id });
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.deleteOne(req.params.id);
    return res.json({ deleted: req.params.id });
  });
}
