import { Tag } from "../models";
import { TagEntity } from "./../entities";
import { GenericCrudController } from "./generic-crud.controller";

export class TagController extends GenericCrudController<Tag> {
  constructor() {
    super(TagEntity);
  }
}
