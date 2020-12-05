import { DbEnity } from "../../dal/genric-entity.dal";
import { GenericCrudActions } from "./generic-crud-actions";
import { Document } from "mongoose";

export class ControllerFactory<T extends Document> {
  protected crudController: GenericCrudActions<T>;
  constructor(dbEnity: DbEnity<T>) {
    this.crudController = new GenericCrudActions<T>(dbEnity);
  }
}
