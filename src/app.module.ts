import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimationModule } from './animation/animation.module';

@Module({
  imports: [AnimationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
