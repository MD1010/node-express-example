import { DbEnity } from "../../dal/genric-entity.dal";
import { GenericCrudActions } from "./generic-crud-actions";
import { Document } from "mongoose";

export class CrudActionsFactory<T extends Document> {
  protected crudActions: GenericCrudActions<T>;
  constructor(dbEnity: DbEnity<T>) {
    this.crudActions = new GenericCrudActions<T>(dbEnity);
  }
}
