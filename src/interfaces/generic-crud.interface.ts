export interface IReadEntity<T> {
  find: (prop: any, pageNumber: string | undefined) => Promise<T | T[]> | any;
}

export interface IWriteEntity<T> {
  create: (entity: T) => Promise<T>;
  updateOne: (id: string, item: T) => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
}
