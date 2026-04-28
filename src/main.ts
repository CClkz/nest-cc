import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // 启用全局异常过滤器
    app.useGlobalFilters(new HttpExceptionFilter());

    // 启用全局参数校验
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 自动过滤DTO中没有的属性
        forbidNonWhitelisted: true, // 如果请求包含DTO中没有的属性，抛出错误
        transform: true, // 自动转换类型（如字符串转数字）
      }),
    );

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(
      `\x1b[32mNest application started successfully on port ${port}.\x1b[0m`,
    );
  } catch (error) {
    console.error('\x1b[31mNest application failed to start.\x1b[0m', error);
    process.exit(1);
  }
}
void bootstrap();
