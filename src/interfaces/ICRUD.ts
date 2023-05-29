import { Model } from 'sequelize-typescript';

// TODO thinking of using the generalized interface
export interface ICRUD {
  get(param): Promise<Model>;

  create(dto): Promise<Model>;

  delete(id): Promise<number>;

  update(id: number, option: Partial<Model>): Promise<[affectedRows: number]>;
}
