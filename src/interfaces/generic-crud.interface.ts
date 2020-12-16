export interface IReadEntity<T> {
  findOne: (prop: any) => Promise<T | null> | any;

  // for the meantime to the switch case in crud find all
  findAll: () => Promise<T[]> | any;
}

export interface IWriteEntity<T> {
  create: (entity: T) => Promise<T>;
  updateOne: (id: string, item: T) => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
}
