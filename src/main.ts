import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Bật bộ lọc ngoại lệ
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3001);
}
bootstrap();
