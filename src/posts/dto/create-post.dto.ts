import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Cheap tour in Europe',
    description: 'Title',
  })
  @IsString({ message: 'Must be a string' })
  readonly title: string;

  @ApiProperty({
    example: 'Content about tour',
    description: 'Content',
  })
  @IsString({ message: 'Must be a string' })
  readonly content: string;

  @ApiProperty({
    example: '1',
    description: 'UserId',
  })
  // @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
}
