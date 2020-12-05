import { DbEnity } from "./../../dal/genric-entity.dal";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { errorHandler } from "../../utils/errorHandler";
import { GenericDalActions } from "../../dal/crud-actions.dal";

export abstract class GenericCrudController<T extends Document> {
  private _dalActions: GenericDalActions<T>;
  constructor(private dbEntity: DbEnity<T>) {
    this._dalActions = new GenericDalActions<T>(dbEntity);
  }
  protected getAllEntites = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(await this._dalActions.getAllDalEntities());
    }
  );

  protected createEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this._dalActions.createDalEntity(req.body));
  });

  protected getEntityById = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(
        await this._dalActions.getDalEntity({ id: req.params.id })
      );
    }
  );

  protected findEntityByFilter = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(await this._dalActions.getDalEntity(req.body));
    }
  );

  protected updateEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this._dalActions.updateDalEntity(req.params.id, req.body)
    );
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this._dalActions.deleteDalEntity(req.params.id));
  });
}
