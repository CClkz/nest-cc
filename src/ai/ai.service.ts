import { Injectable, Logger } from '@nestjs/common';
import { ChatMessageDto, QuestionDto } from './dto/chat.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private chatHistory: Map<string, ChatMessageDto[]> = new Map();
  private dataStreamSubscribers: Array<(data: any) => void> = [];

  async getChatList(userId: string): Promise<ChatMessageDto[]> {
    // 模拟获取聊天历史
    if (!this.chatHistory.has(userId)) {
      this.chatHistory.set(userId, []);
    }
    return this.chatHistory.get(userId) || [];
  }

  async addChatMessage(chatMessage: ChatMessageDto): Promise<void> {
    const userId = chatMessage.userId;
    if (!this.chatHistory.has(userId)) {
      this.chatHistory.set(userId, []);
    }
    
    const history = this.chatHistory.get(userId);
    history.push({
      ...chatMessage,
      timestamp: chatMessage.timestamp || new Date(),
      type: chatMessage.type || 'user',
    });
    
    // 限制历史记录数量
    if (history.length > 100) {
      history.shift(); // 移除最旧的消息
    }
    
    this.chatHistory.set(userId, history);
    this.logger.log(`Added message for user ${userId}`);
  }

  async processQuestion(questionDto: QuestionDto): Promise<{ answer: string }> {
    // 模拟AI问答处理
    const answer = `根据您的问题 "${questionDto.question}"，这是AI生成的答案。`;
    
    // 在实际应用中，这里会调用真正的AI服务
    this.logger.log(`Processed question: ${questionDto.question}`);
    return { answer };
  }

  subscribeToDataStream(callback: (data: any) => void): void {
    this.dataStreamSubscribers.push(callback);
    this.logger.log(`New data stream subscriber added. Total: ${this.dataStreamSubscribers.length}`);
  }

  unsubscribeFromDataStream(callback: (data: any) => void): void {
    const index = this.dataStreamSubscribers.indexOf(callback);
    if (index > -1) {
      this.dataStreamSubscribers.splice(index, 1);
      this.logger.log(`Data stream subscriber removed. Total: ${this.dataStreamSubscribers.length}`);
    }
  }

  publishData(data: any): void {
    this.dataStreamSubscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        this.logger.error('Error in data stream subscriber:', error);
      }
    });
  }

  // 测试方法：模拟数据推送
  triggerTestDataPush(): void {
    const testData = {
      message: '测试数据推送',
      timestamp: new Date(),
      type: 'test'
    };
    this.publishData(testData);
  }
}