import { Document } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { GenericCrudController } from "./generic-crud.controller";

export class CrudEntityController<
  T extends Document
> extends GenericCrudController<T> {
  constructor(private entity: DbEnity<T>) {
    super(entity);
  }
}
