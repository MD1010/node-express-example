import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../../dal/genric-entity.dal";
import { errorHandler } from "../../utils/errorHandler";

export class GenericCrudController<T extends Document> {
  constructor(private dbEntity: DbEnity<T>) {}
  createEntity = async (entity: T) => {
    return await this.dbEntity.create(entity);
  };

  getEntity = async (filter: { [key: string]: any }) => {
    return await this.dbEntity.findOne(filter);
  };

  updateEntity = async (id: string, newEntity: T) => {
    return await this.dbEntity.updateOne(id, newEntity);
  };

  deleteEntity = async (id: string) => {
    return await this.dbEntity.deleteOne(id);
  };

  getAllEntities = async () => {
    return await this.dbEntity.findAll();
  };
}
