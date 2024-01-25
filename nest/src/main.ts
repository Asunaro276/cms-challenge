import { NestFactory } from '@nestjs/core';
import { RootModule } from './module/.RootModule'

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  await app.listen(3000);
}
bootstrap();
