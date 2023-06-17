import { BanUserDto } from '../ban/dto/ban-user.dto';

export interface IBan {
  ban(dto: BanUserDto): Promise<[affectedRows: number]>;
}
