import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetBlogPostsDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}