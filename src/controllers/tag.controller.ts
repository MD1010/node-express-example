import { ITag } from "../models";
import { TagEntity } from "./../entities/tag.entity";
import { GenericCrudController } from "./generic-crud.controller";

export class TagController extends GenericCrudController<ITag> {
  constructor() {
    super(TagEntity);
  }
}
