import { IPost } from "../interfaces";
import Posts from '../models/post.model';
import mongoose, { CreateQuery, UpdateQuery } from 'mongoose';

export namespace PostDAL {

    export const createPost = async (post: IPost) => {
        return Posts.create(post)
          .then((data: IPost) => {
            return data;
          })
          .catch((error: Error) => {
            throw error;
          });
    }

    export const updatePost = async (id: string, post: IPost) => {
        return Posts.updateOne({_id: toObjectId(id)} ,post)
          .then((result: IPost) => {
            return result;
          })
          .catch((error: Error) => {
            throw error;
          });
    }

    export const deletePost = async (id: string) => {
        return Posts.deleteOne({_id: toObjectId(id)})
          .then((result: any) => {
            return result;
          })
          .catch((error: Error) => {
            throw error;
          });
    }

    export const getPost = async (id: string) => {
        return Posts.findById({_id: toObjectId(id)})
          .then((result: IPost | null) => {
            return result;
          })
          .catch((error: Error) => {
            throw error;
          });
    }

    export const getAllPosts = () => {
        return Posts.find()
          .then((result: IPost[]) => {
            return result;
          })
          .catch((error: Error) => {
            throw error;
          });
    }  
    
    const toObjectId = (_id: string): mongoose.Types.ObjectId => {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
