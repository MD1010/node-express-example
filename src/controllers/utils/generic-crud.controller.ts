import { Request, Response } from "express";
import { isEmpty } from "lodash";
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

    let { name, muscles, muscleGroup, difficultyLevel, ...remainingFilters } = filter;

    // if (filter.name) {
    //   customFilter3 = { name: new RegExp([filter.name].join(""), "i") as any };
    //   delete filter.name;
    // }
    // if (filter.muscles) {
    //   let arr = filter.muscles.toString().split(",");
    //   customFilter1 = { $or: [{ "muscles.primary": { $in: arr } }, { "muscles.secondary": { $in: arr } }] };
    //   delete filter.muscles;
    // }

    // if (filter.muscleGroup) {
    //   let muscleGroup = filter.muscleGroup.toString();
    //   customFilter2 = { muscleGroup: muscleGroup };
    //   delete filter.muscleGroup;
    // }

    // if (filter.difficultyLevel) {
    //   let difficultyLevel = filter.difficultyLevel.toString();
    //   customFilter4 = { difficultyLevel: difficultyLevel };
    //   delete filter.difficultyLevel;
    // }

    const filter23 = {
      $and: [
        !isEmpty(name) ? { name: new RegExp([name].join(""), "i") as any } : {},
        !isEmpty(muscles)
          ? {
              $or: [
                { "muscles.primary": { $in: muscles?.toString().split(",") } },
                { "muscles.secondary": { $in: muscles?.toString().split(",") } },
              ],
            }
          : {},
        !isEmpty(muscleGroup) ? { muscleGroup: muscleGroup?.toString() } : {},
        !isEmpty(difficultyLevel) ? { difficultyLevel: difficultyLevel?.toString() } : {},
        { ...remainingFilters },
      ],
    };

    // const finalFilter = {
    //   $and: [{ ...customFilter3 }, { ...customFilter1 }, { ...customFilter2 }, { ...customFilter4 }, { ...filter }],
    // };
    const entities = await this.dbEntity.find(filter23, pageNumber?.toString());

    const totalFilteredRecords = (await this.dbEntity.find(filter23)).length;
    // const totalFilteredRecords = (await this.dbEntity.getModel().find(filter23)).length;

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
