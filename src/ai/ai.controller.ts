import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Sse,
  MessageEvent,
  Req,
} from '@nestjs/common';
import { Observable, interval, map, tap } from 'rxjs';
import { Request, Response } from 'express';
import { AiService } from './ai.service';
import { ChatMessageDto, QuestionDto } from './dto/chat.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('chatlist/:userId')
  async getChatList(@Param('userId') userId: string): Promise<ChatMessageDto[]> {
    return await this.aiService.getChatList(userId);
  }

  @Post('chat')
  async addChatMessage(@Body() chatMessage: ChatMessageDto): Promise<any> {
    await this.aiService.addChatMessage(chatMessage);
    return { success: true, message: '消息已添加' };
  }

  @Post('question')
  async processQuestion(@Body() questionDto: QuestionDto): Promise<{ answer: string }> {
    return await this.aiService.processQuestion(questionDto);
  }

  @Sse('data-stream')
  dataStream(@Req() req: Request): Observable<MessageEvent> {
    return new Observable(observer => {
      // 订阅数据流
      const callback = (data: any) => {
        observer.next({ data });
      };

      this.aiService.subscribeToDataStream(callback);

      // 当客户端断开连接时取消订阅
      req.on('close', () => {
        this.aiService.unsubscribeFromDataStream(callback);
        observer.complete();
      });

      // 可选：发送初始事件
      observer.next({ data: { connected: true, timestamp: new Date() } });
    });
  }

  @Get('sse-test')
  async sseTest(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let counter = 0;
    const intervalId = setInterval(() => {
      res.write(`data: ${JSON.stringify({ message: `Server message #${counter++}`, timestamp: new Date() })}\n\n`);
    }, 1000);

    // 当客户端断开连接时清理
    res.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  }
}