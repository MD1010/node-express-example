import { PostEntity } from "./../entities/post.entity";
import { Router } from "express";
import { MuscleEntity } from "../entities";
import { MuscleController, PostController } from "./../controllers";

export const postRouter = Router();
const postController = new PostController(PostEntity);

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.updatePost);
postRouter.get("/:id", postController.getPost);
postRouter.delete("/:id", postController.deletePost);
