import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUppercase } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Role value',
  })
  @IsUppercase()
  @IsString({ message: 'Must be a string' })
  readonly value: string;

  @ApiProperty({
    example: 'Administration',
    description: 'Role description',
  })
  @IsString({ message: 'Must be a string' })
  readonly description: string;
}
