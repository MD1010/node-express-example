export interface IServerException {
  message: string;
  code: number;
}
export namespace Exceptions {
  export const WRONG_CREDENTIALS: IServerException = {
    message: "Wrong Credentials, please try again",
    code: 401,
  };
}
