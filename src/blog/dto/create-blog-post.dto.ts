export class CreateBlogPostDto {
  title: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
}