import { DbEnity } from "../../dal/genric-entity.dal";
import { GenericCrudController } from "./generic-crud.controller";
import { Document } from "mongoose";

export class ControllerFactory<T extends Document> {
  protected crudController: GenericCrudController<T>;
  constructor(dbEnity: DbEnity<T>) {
    this.crudController = new GenericCrudController<T>(dbEnity);
  }
}
