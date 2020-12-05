import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Tag } from "../models";
import { GenericCrudController } from "./utils/controller-factory";

export class TagController extends GenericCrudController<Tag> {
  getAllTags = this.getAllEntites;
  createTag = this.createEntity;
  getTag = this.getEntityById;
  updateTag = this.updateEntity;
  deleteTag = this.deleteEntity;
}
