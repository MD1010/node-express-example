import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Post } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class PostController extends ControllerFactory<Post> {
  getAllPosts = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getAllEntities());
  });

  createPost = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.createEntity(req.body));
  });

  getPost = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getEntity({ id: req.params.id }));
  });

  updatePost = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudActions.updateEntity(req.params.id, req.body)
    );
  });

  deletePost = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.deleteEntity(req.params.id));
  });
}
