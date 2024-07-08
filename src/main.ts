import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, });

  const config = new DocumentBuilder()
    .setTitle('Сервис "КупиПодариДай"')
    .setDescription('Описание API сервиса "КупиПодариДай"')
    .setVersion('1.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new BadRequestException('Ошибка валидации полученных данных'),
    }),
  );

  app.use(helmet());

  await app.listen(process.env.APP_SERVER_PORT || 3000);
}

bootstrap();
