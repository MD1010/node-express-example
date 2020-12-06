import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "./genric-entity.dal";
import { errorHandler } from "../utils/errorHandler";

export class GenericDalActions<T extends Document> {
  constructor(private dbEntity: DbEnity<T>) {}
  createDalEntity = (entity: T) => {
    return this.dbEntity.create(entity);
  };

  getDalEntity = (filter: { [key: string]: any }) => {
    return this.dbEntity.findOne(filter);
  };

  updateDalEntity = (id: string, newEntity: T) => {
    return this.dbEntity.updateOne(id, newEntity);
  };

  deleteDalEntity = (id: string) => {
    return this.dbEntity.deleteOne(id);
  };

  getAllDalEntities = () => {
    return this.dbEntity.findAll();
  };
}
