import { InjectModel } from '@nestjs/sequelize';

import { ICRUD } from '../interfaces/ICRUD';
import { Role } from './roles.model';

export class RolesRepo implements ICRUD {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  public async create(dto): Promise<Role> {
    return this.roleRepository.create(dto);
  }

  public async delete(id): Promise<number> {
    return this.roleRepository.destroy({ where: { id } });
  }

  public async get(value): Promise<Role> {
    return this.roleRepository.findOne({ where: { value } });
  }

  public async update(
    id: number,
    option: Partial<Role>,
  ): Promise<[affectedRows: number]> {
    return this.roleRepository.update(option, { where: { id } });
  }
}
