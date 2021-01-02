import { PostEntity } from "../entities";
import { Post } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { errorHandler } from "../utils/errorHandler";
import { Request, Response } from "express";
import { emit } from "process";
import { toObjectId } from "../utils/base-id";

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
    console.log("gfgfgfgfgfg");
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
