import { Post } from "../models";
import { PostEntity } from "../entities";
import { GenericCrudController } from "./generic-crud.controller";

export class PostController extends GenericCrudController<Post> {
  constructor() {
    super(PostEntity);
  }
}
