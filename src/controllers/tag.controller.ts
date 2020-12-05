import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Tag } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class TagController extends ControllerFactory<Tag> {
  getAllTags = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getAllEntities());
  });

  createTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.createEntity(req.body));
  });

  getTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getEntity({ id: req.params.id }));
  });

  updateTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudController.updateEntity(req.params.id, req.body)
    );
  });

  deleteTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.deleteEntity(req.params.id));
  });
}
