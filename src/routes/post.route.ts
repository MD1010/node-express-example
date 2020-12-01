import { Router } from "express";
import { PostController } from "../controllers";
export const postRouter = Router();

postRouter.post('/', PostController.createPost);
postRouter.put('/:id', PostController.updatePost);
postRouter.get('/:id', PostController.getPost);
postRouter.delete('/:id', PostController.deletePost);
postRouter.get('/', PostController.getAllPosts);
