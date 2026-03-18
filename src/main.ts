import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
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
