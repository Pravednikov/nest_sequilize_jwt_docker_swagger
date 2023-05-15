import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Email',
  })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password',
  })
  @IsString({ message: 'Should be a string' })
  @Length(6, 16, { message: 'Password length should be between 6 and 16' })
  readonly password: string;
}
