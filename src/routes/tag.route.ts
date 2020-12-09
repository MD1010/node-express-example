import { Router } from "express";
import { TagController } from "./../controllers";

export const tagRouter = Router();
const tagController = new TagController();

tagRouter.get("/", tagController.getAllTags);
tagRouter.post("/", tagController.createTag);
tagRouter.put("/:id", tagController.updateTag);
tagRouter.get("/:id", tagController.getTag);
tagRouter.delete("/:id", tagController.deleteTag);
