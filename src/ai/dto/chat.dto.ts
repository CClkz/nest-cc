export class ChatMessageDto {
  readonly userId: string;
  readonly message: string;
  readonly messageId?: string;
  readonly timestamp?: Date;
  readonly type?: 'user' | 'ai' | 'system';
}

export class QuestionDto {
  readonly question: string;
  readonly context?: string;
  readonly userId?: string;
  readonly sessionId?: string;
}