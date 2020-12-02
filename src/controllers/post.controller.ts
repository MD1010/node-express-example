import { IPost } from "../interfaces";
import { PostEntity } from "../models/post.model";
import { GenericCrudController } from "./generic-crud.controller";

export class PostController extends GenericCrudController<IPost> {
  constructor() {
    super(PostEntity);
  }
}
