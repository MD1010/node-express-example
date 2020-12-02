import { Router } from "express";
import { PostController } from "../controllers";

export const postRouter = Router();
const postController = new PostController();

postRouter.get("/", postController.getAllEntities);
postRouter.post("/", postController.createEntity);
postRouter.put("/:id", postController.updateEntity);
postRouter.get("/:id", postController.getEntity);
postRouter.delete("/:id", postController.deleteEntity);
