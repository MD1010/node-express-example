import { Tag } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { TagEntity } from "../entities";

export class TagController extends GenericCrudController<Tag> {

  constructor() {
    super(TagEntity)
  }
  getAllTags = this.getAllEntites;
  createTag = this.createEntity;
  getTag = this.getEntityById;
  updateTag = this.updateEntity;
  deleteTag = this.deleteEntity;
}
