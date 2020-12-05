import { Router } from "express";
import { TagController } from "./../controllers";
import { TagEntity } from "./../entities/tag.entity";

export const tagRouter = Router();
const tagController = new TagController(TagEntity);

tagRouter.get("/", tagController.getAllTags);
tagRouter.post("/", tagController.createTag);
tagRouter.put("/:id", tagController.updateTag);
tagRouter.get("/:id", tagController.getTag);
tagRouter.delete("/:id", tagController.deleteTag);
