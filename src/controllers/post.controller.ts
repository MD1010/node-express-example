import {PostDAL} from "../dal"
import { Request, Response } from 'express';

export namespace PostController {

    export const createPost = async (req: Request, res: Response) => {
        return res.json(await PostDAL.createPost(req.body));
    }

    export const getPost = async (req: Request, res: Response) => {
        return res.json(await PostDAL.getPost(req.params.id));
    }

    export const updatePost = async (req: Request, res: Response) => {
        return res.json(await PostDAL.updatePost(req.params.id, req.body));
    }

    export const deletePost = async (req: Request, res: Response) => {
        return res.json(await PostDAL.deletePost(req.params.id));
    }

    export const getAllPosts = async (res: Response) => {
        return res.json(await PostDAL.getAllPosts());
    }

}
