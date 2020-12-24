import { Post } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { PostEntity } from "../entities";
import { errorHandler } from "../utils";
import { TrainingDAL } from "../dal";

export class PostController extends GenericCrudController<Post> {
  constructor() {
    super(PostEntity);
  }

  getAllPosts = this.getAllEntites;
  createPost = this.createEntity;
  getPost = this.getEntityById;
  updatePost = this.updateEntity;
  deletePost = this.deleteEntity;
}
