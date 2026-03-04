import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimationModule } from './animation/animation.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AnimationModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}