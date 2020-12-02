import { Document } from "mongoose";
import { Router } from "express";
import { GenericCrudController } from "../controllers/generic-crud.controller";

export class CrudRouter<T extends Document> {
  private _crudRouter = Router();
  constructor(private controller: GenericCrudController<T>) {
    this._crudRouter.get("/", controller.getAllEntities);
    this._crudRouter.post("/", controller.createEntity);
    this._crudRouter.put("/:id", controller.updateEntity);
    this._crudRouter.get("/:id", controller.getEntity);
    this._crudRouter.delete("/:id", controller.deleteEntity);
  }

  getRouter() {
    return this._crudRouter;
  }
}
