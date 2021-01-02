import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { Document } from "mongoose";
import { DbEnity } from "../../dal";
import { errorHandler, toObjectId } from "../../utils";

export abstract class GenericCrudController<T extends Document> {
  constructor(protected dbEntity: DbEnity<T>) {}

  protected getEntities = errorHandler(async (req: Request, res: Response) => {
    let { pageNumber, ...filter } = req.query;
    let customFilter = {};
    if (filter.name) {
      let filter3 = { name: new RegExp([filter.name].join(""), "i") as any };
      customFilter = { ...filter3 };
    }
    if (filter.muslces) {
      let arr = filter.muslces.toString().split(",");
      let filter1 = { $or: [{ "muscles.primary": { $in: arr } }, { "muscles.secondary": { $in: arr } }] };
      // customFilter = { $and: [{ ...customFilter }, { ...filter1 }] };
      customFilter = { ...customFilter, ...filter1 };
    }

    if (filter.muscleGroup) {
      console.log(customFilter);
      let muscleGroup = filter.muscleGroup.toString();
      let filter2 = { muscleGroup: muscleGroup };
      customFilter = { $and: [{ ...customFilter }, { ...filter2 }] };
    }

    console.log(customFilter);
    const entities = await this.dbEntity.find(customFilter, pageNumber?.toString());
    if (isEmpty(customFilter) && isEmpty(pageNumber)) {
      return res.json(entities);
    }
    //for filter case total records has to be added for pagination

    const totalFilteredRecords = (await this.dbEntity.getModel().find(customFilter)).length;

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
