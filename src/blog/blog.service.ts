import { Injectable } from '@nestjs/common';
import { GetBlogPostsDto } from './dto/get-blog-posts.dto';

// 模拟博客文章类型
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  published: boolean;
}

@Injectable()
export class BlogService {
  // 模拟数据存储
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'NestJS入门指南',
      content:
        'NestJS是一个用于构建高效、可扩展的Node.js服务器端应用程序的框架...',
      author: '张三',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      tags: ['NestJS', 'Node.js', '后端'],
      published: true,
    },
    {
      id: 2,
      title: 'TypeScript高级特性',
      content: 'TypeScript提供了许多强大的类型系统特性...',
      author: '李四',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-12'),
      tags: ['TypeScript', '编程'],
      published: true,
    },
    {
      id: 3,
      title: 'REST API设计最佳实践',
      content: '设计良好的REST API对于现代Web应用至关重要...',
      author: '王五',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-05'),
      tags: ['API', 'REST', '设计'],
      published: false,
    },
  ];

  // 获取所有博客文章（支持分页和过滤）
  findAll(query?: GetBlogPostsDto): BlogPost[] {
    let filteredPosts = [...this.blogPosts];

    if (query?.published !== undefined) {
      filteredPosts = filteredPosts.filter(
        post => post.published === query.published,
      );
    }

    if (query?.author) {
      filteredPosts = filteredPosts.filter(post =>
        post.author.toLowerCase().includes(query.author!.toLowerCase()),
      );
    }

    if (query?.tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag =>
          tag.toLowerCase().includes(query.tag!.toLowerCase()),
        ),
      );
    }

    return filteredPosts;
  }

  // 根据ID查找博客文章
  findOne(id: number): BlogPost | null {
    return this.blogPosts.find(post => post.id === id) || null;
  }

  // 创建新的博客文章
  create(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const newId =
      this.blogPosts.length > 0
        ? Math.max(...this.blogPosts.map(post => post.id)) + 1
        : 1;

    const newPost: BlogPost = {
      ...postData,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.blogPosts.push(newPost);
    return newPost;
  }

  // 更新博客文章
  update(
    id: number,
    updateData: Partial<Omit<BlogPost, 'id' | 'createdAt'>>,
  ): BlogPost | null {
    const index = this.blogPosts.findIndex(post => post.id === id);

    if (index === -1) {
      return null;
    }

    const updatedPost = {
      ...this.blogPosts[index],
      ...updateData,
      updatedAt: new Date(),
    };

    this.blogPosts[index] = updatedPost;
    return updatedPost;
  }

  // 删除博客文章
  remove(id: number): boolean {
    const index = this.blogPosts.findIndex(post => post.id === id);

    if (index === -1) {
      return false;
    }

    this.blogPosts.splice(index, 1);
    return true;
  }

  // 搜索博客文章（标题和内容）
  search(keyword: string): BlogPost[] {
    const lowerKeyword = keyword.toLowerCase();
    console.log('lowerKeyword', lowerKeyword);
    return this.blogPosts.filter(
      post =>
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.content.toLowerCase().includes(lowerKeyword),
    );
  }

  // 获取所有标签
  getAllTags(): string[] {
    const tagSet = new Set<string>();
    this.blogPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }

  // 切换发布状态
  togglePublish(id: number): BlogPost | null {
    const post = this.findOne(id);
    if (!post) {
      return null;
    }

    return this.update(id, { published: !post.published });
  }
}
