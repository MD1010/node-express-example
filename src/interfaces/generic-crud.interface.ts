export interface IReadEntity<T> {
  findOne: (prop: any) => Promise<T | null>;
  findAll: () => Promise<T[]>;
}

export interface IWriteEntity<T> {
  create: (entity: T) => Promise<T>;
  updateOne: (id: string, item: T) => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
}
