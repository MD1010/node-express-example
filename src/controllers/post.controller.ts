import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Post } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class PostController extends ControllerFactory<Post> {
  getAllPosts = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getAllEntities());
  });

  createPost = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.createEntity(req.body));
  });

  getPost = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getEntity({ id: req.params.id }));
  });

  updatePost = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudController.updateEntity(req.params.id, req.body)
    );
  });

  deletePost = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.deleteEntity(req.params.id));
  });
}
