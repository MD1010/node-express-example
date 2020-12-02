import { Router } from "express";
import { Document } from "mongoose";
import { CrudEntityController } from "../controllers/entity-crud.controller";

export class CrudRouter<T extends Document> {
  private _crudRouter = Router();
  constructor(private controller: CrudEntityController<T>) {
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
