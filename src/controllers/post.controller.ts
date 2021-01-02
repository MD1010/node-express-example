import { Request, Response } from "express";
import { emit } from "process";
import { PostEntity } from "../entities";
import { Post } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class PostController extends GenericCrudController<Post> {
  constructor() {
    super(PostEntity);
  }

  getAllPosts = this.getEntities;
  createPost = this.createEntity;
  getPost = this.getEntityById;
  updatePost = this.updateEntity;
  deletePost = this.deleteEntity;

  getMostViewdTraining = errorHandler(async (req: Request, res: Response) => {
    let o: any = {},
      self = this;
    o.map = function () {
      emit(this.trainingID, this.numOfLikes);
    };

    o.reduce = function (k: any, values: any) {
      return values.reduce((a: number, b: number) => a + b, 0);
    };
    await this.dbEntity.getModel().mapReduce(o, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Groups not found" });
      } else {
        res.json(results);
      }
    });
  });
}
