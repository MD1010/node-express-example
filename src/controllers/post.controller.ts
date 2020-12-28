import { PostEntity } from "../entities";
import { Post } from "../models";
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
}
