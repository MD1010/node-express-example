import { Request, Response } from "express";
import { Document } from "mongoose";
import { DbEnity } from "../../dal";
import { errorHandler, toObjectId } from "../../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  protected getEntities = errorHandler(async (req: Request, res: Response) => {
    let { pageNumber, ...filter } = req.query;
    let customFilter1 = {};
    let customFilter2 = {};
    let customFilter3 = {};
    let customFilter4 = {};

    if (filter.name) {
      customFilter3 = { name: new RegExp([filter.name].join(""), "i") as any };
    }
    if (filter.muscles) {
      let arr = filter.muscles.toString().split(",");
      customFilter1 = { $or: [{ "muscles.primary": { $in: arr } }, { "muscles.secondary": { $in: arr } }] };
    }

    if (filter.muscleGroup) {
      let muscleGroup = filter.muscleGroup.toString();
      customFilter2 = { muscleGroup: muscleGroup };
    }

    if (filter.difficultyLevel) {
      let difficultyLevel = filter.difficultyLevel.toString();
      customFilter4 = { difficultyLevel: difficultyLevel };
    }

    const finalFilter = {
      $and: [{ ...customFilter3 }, { ...customFilter1 }, { ...customFilter2 }, { ...customFilter4 }],
    };
    const entities = await this.dbEntity.find(finalFilter, pageNumber?.toString());

    const totalFilteredRecords = (await this.dbEntity.getModel().find(finalFilter)).length;

    return res.json({ entities, totalFilteredRecords });
  });

  protected getEntityById = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.find({ _id: req.params.id }, req.query.pageNumber?.toString()));
  });

  protected createEntity = errorHandler(async (req: Request, res: Response) => {
    const newEntity = await this.dbEntity.create(req.body);
    return res.json({ created: newEntity._id });
  });

  protected updateEntity = errorHandler(async (req: Request, res: Response) => {
    await this.dbEntity.updateOne(req.params.id, req.body);
    return res.json({ updated: req.params.id });
  });

  protected deleteEntity = errorHandler(async (req: Request, res: Response) => {
    let obj = await this.dbEntity.findOne({ _id: req.params.id });
    await this.dbEntity.deleteOne(req.params.id);
    await obj.remove();
    return res.json({ deleted: req.params.id });
  });
}
