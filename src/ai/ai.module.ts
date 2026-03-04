import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService], // 导出服务，以便其他模块可以使用
})
export class AiModule {}