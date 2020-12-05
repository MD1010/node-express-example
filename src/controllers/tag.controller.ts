import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Tag } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class TagController extends ControllerFactory<Tag> {
  getAllTags = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getAllEntities());
  });

  createTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.createEntity(req.body));
  });

  getTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getEntity({ id: req.params.id }));
  });

  updateTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudActions.updateEntity(req.params.id, req.body)
    );
  });

  deleteTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.deleteEntity(req.params.id));
  });
}
