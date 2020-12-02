export interface IReadEntity<T> {
  findById: (id: string) => Promise<T | null>;
  findOne: (prop: any) => Promise<T | null>;
  findAll: () => Promise<T[]>;
}

export interface IWriteEntity<T> {
  create: (entity: T) => Promise<T>;
  updateOne: (id: string, item: T) => Promise<any>;
  deleteOne: (id: string) => Promise<any>;
}
