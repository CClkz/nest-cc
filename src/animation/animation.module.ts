import { Module } from '@nestjs/common';
import { AnimationController } from './animation.controller';
import { AnimationService } from './animation.service';

@Module({
  controllers: [AnimationController],
  providers: [AnimationService],
})
export class AnimationModule {}
