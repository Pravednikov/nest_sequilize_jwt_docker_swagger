import { AddRoleDto } from '../roles/dto/add-role.dto';
import { Role } from '../roles/roles.model';
import { User } from '../users/users.model';

export interface IRole {
  get(param): Promise<Role>;

  create(dto): Promise<Role>;

  delete(id): Promise<number>;

  update(id: number, option: Partial<Role>): Promise<[affectedRows: number]>;

  add(dto: AddRoleDto): Promise<{ msg: string }>;

  setDefaultRole(user: User): Promise<void>;
}
