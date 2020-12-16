export interface IServerException {
  message: string;
  code: number;
}
export namespace Exceptions {
  export const UNAUTHORIZED: IServerException = {
    message: "Wrong Credentials, please try again",
    code: 401,
  };

  export const ENTITY_EXISTS: IServerException = {
    message: "Entity already exists",
    code: 409, // conflict
  };

  export const CREATE_FAILED: IServerException = {
    message: "Entity failed to create",
    code: 500,
  };

  export const UPDATE_FAILED: IServerException = {
    message: "Entity Update failed",
    code: 500,
  };

  export const DELETE_FAILED: IServerException = {
    message: "Entity Deletion failed",
    code: 500,
  };

  export const BAD_REQUEST: IServerException = {
    message: "Bad Request",
    code: 400,
  };
}
