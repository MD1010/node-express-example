import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Post } from "../models";
import { GenericCrudController } from "./utils/controller-factory";

export class PostController extends GenericCrudController<Post> {
  getAllPosts = this.getAllEntites;
  createPost = this.createEntity;
  getPost = this.getEntityById;
  updatePost = this.updateEntity;
  deletePost = this.deleteEntity;
}
