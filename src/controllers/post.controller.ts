import { Post } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { PostEntity } from "../entities";

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
