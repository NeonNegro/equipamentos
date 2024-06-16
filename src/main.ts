import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .addBearerAuth()
    .build()
  );
  SwaggerModule.setup('api',app, document);
  await app.listen(3000);
}
bootstrap();