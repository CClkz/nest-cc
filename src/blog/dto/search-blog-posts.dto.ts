import { IsString, IsNotEmpty } from 'class-validator';

export class SearchBlogPostsDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
