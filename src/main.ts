import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

import helmet from 'helmet';
const { ORIGIN_URL } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable validation for endpoints
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // security middlewares
  // set appropriately header from well-known web vulnerabilities
  app.use(helmet());

  // CORS protection
  app.enableCors({
    origin: ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  });

  // setup open api docs
  const config = new DocumentBuilder()
    .setTitle('Balance')
    .setDescription('Balance transaction api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  // init server
  await app.listen(3000);
}
bootstrap();
