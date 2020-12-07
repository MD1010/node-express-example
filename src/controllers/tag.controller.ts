import { Tag } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class TagController extends GenericCrudController<Tag> {
  getAllTags = this.getAllEntites;
  createTag = this.createEntity;
  getTag = this.getEntityById;
  updateTag = this.updateEntity;
  deleteTag = this.deleteEntity;
}
