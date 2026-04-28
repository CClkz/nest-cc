import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BlogService, BlogPost } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { GetBlogPostsDto } from './dto/get-blog-posts.dto';
import { SearchBlogPostsDto } from './dto/search-blog-posts.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // 获取所有博客文章（支持过滤）
  @Get()
  findAll(@Query() getBlogPostsDto: GetBlogPostsDto) {
    return {
      code: 0,
      message: 'Success',
      data: this.blogService.findAll(getBlogPostsDto),
    };
  }

  // 根据ID获取博客文章
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('enter :id');
    const postId = parseInt(id, 10);
    const post = this.blogService.findOne(postId);

    if (!post) {
      return {
        code: 404,
        message: 'Blog post not found',
        data: null,
      };
    }

    return {
      code: 0,
      message: 'Success',
      data: post,
    };
  }

  // 创建新的博客文章
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    const newPost: BlogPost = this.blogService.create(createBlogPostDto);
    return {
      code: 0,
      message: 'Blog post created successfully',
      data: newPost,
    };
  }

  // 更新博客文章
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    const postId = parseInt(id, 10);
    const updatedPost = this.blogService.update(postId, updateBlogPostDto);

    if (!updatedPost) {
      return {
        code: 404,
        message: 'Blog post not found',
        data: null,
      };
    }

    return {
      code: 0,
      message: 'Blog post updated successfully',
      data: updatedPost,
    };
  }

  // 删除博客文章
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    const deleted = this.blogService.remove(postId);

    if (!deleted) {
      return {
        code: 404,
        message: 'Blog post not found',
        data: null,
      };
    }

    return null; // 204 No Content
  }

  // 搜索博客文章
  @Get('search')
  search(@Query() searchBlogPostsDto: SearchBlogPostsDto) {
    const results = this.blogService.search(searchBlogPostsDto.q);
    return {
      code: 0,
      message: 'Search completed',
      data: results,
    };
  }

  // 获取所有标签
  @Get('tags/all')
  getAllTags() {
    const tags = this.blogService.getAllTags();
    return {
      code: 0,
      message: 'Success',
      data: tags,
    };
  }

  // 切换发布状态
  @Put(':id/publish')
  togglePublish(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    const updatedPost = this.blogService.togglePublish(postId);

    if (!updatedPost) {
      return {
        code: 404,
        message: 'Blog post not found',
        data: null,
      };
    }

    return {
      code: 0,
      message: `Blog post ${updatedPost.published ? 'published' : 'unpublished'} successfully`,
      data: updatedPost,
    };
  }
}
