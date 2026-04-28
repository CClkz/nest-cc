import {
  IsString,
  IsArray,
  IsBoolean,
  ArrayMinSize,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateBlogPostDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  author?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}