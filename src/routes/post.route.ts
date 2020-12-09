import { Router } from "express";
import { PostController } from "./../controllers";

export const postRouter = Router();
const postController = new PostController();

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.updatePost);
postRouter.get("/:id", postController.getPost);
postRouter.delete("/:id", postController.deletePost);
