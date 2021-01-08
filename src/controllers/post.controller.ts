import { Request, Response } from "express";
import { PostEntity, TrainingEntity } from "../entities";
import { Post } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { GenericCrudController } from "./utils/generic-crud.controller";

declare function emit(k: any, v: any): any;

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
    let mapReudceObject: any = {};
    mapReudceObject.map = function () {
      emit(this.trainingID, this.numOfLikes);
    };

    mapReudceObject.reduce = function (k: any, values: any) {
      return values.reduce((a: number, b: number) => a + b, 0);
    };
    await this.dbEntity.getModel().mapReduce(mapReudceObject, async (err, resp) => {
      if (err) {
        res.status(400).json({ msg: "Groups not found" });
      } else {
        return res.json(
          await Promise.all(
            resp.results.map(async (res: any) => {
              const training = await TrainingEntity.findOne({ _id: res._id });
              return { trainingName: training.name, numOfLikes: res.value };
            })
          )
        );
      }
    });
  });
}
