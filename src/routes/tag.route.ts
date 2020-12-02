import { Router } from "express";
import { TagController } from "../controllers";

export const tagRouter = Router();

const tagController = new TagController();

tagRouter.get("/", tagController.getAllEntities);
tagRouter.post("/", tagController.createEntity);
tagRouter.put("/:id", tagController.updateEntity);
tagRouter.get("/:id", tagController.getEntity);
tagRouter.delete("/:id", tagController.deleteEntity);
