import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.enableCors()
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
