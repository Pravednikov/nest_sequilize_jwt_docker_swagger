import { User } from '../users/users.model';

export interface IUser {
  get(param): Promise<User>;

  create(dto): Promise<User>;

  delete(id): Promise<number>;

  update(id: number, option: Partial<User>): Promise<[affectedRows: number]>;

  getAll(): Promise<User[]>;
}
