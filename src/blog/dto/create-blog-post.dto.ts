import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  ArrayMinSize,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(5000)
  content: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  author: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  published: boolean;
}