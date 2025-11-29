import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 프론트가 뜨는 포트 모두 허용
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
