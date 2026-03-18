import { Module } from '@nestjs/common';
import { AnimationModule } from './animation/animation.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [AnimationModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
