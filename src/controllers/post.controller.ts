import {PostDAL} from "../dal"
import { Request, Response } from 'express';
import {runAsyncWrapper} from "../helpers/errorHandler"

export namespace PostController {

    export const createPost = runAsyncWrapper(async (req: Request, res: Response) => {
        return res.json(await PostDAL.createPost(req.body));
    })

    export const getPost = runAsyncWrapper(async (req: Request, res: Response) => {
        return res.json(await PostDAL.getPost(req.params.id));
    })

    export const updatePost = runAsyncWrapper(async (req: Request, res: Response) => {
        return res.json(await PostDAL.updatePost(req.params.id, req.body));
    })

    export const deletePost = runAsyncWrapper(async (req: Request, res: Response) => {
        return res.json(await PostDAL.deletePost(req.params.id));
    })

    export const getAllPosts = runAsyncWrapper(async (req: Request, res: Response, next: any) => {
        return res.json(await PostDAL.getAllPosts());
    })

}
