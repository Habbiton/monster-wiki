import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './role/roles.guard';
import { Reflector } from '@nestjs/core';
import { IdParamInterceptor } from './interceptors/id-param.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Monster wiki')
    .setDescription('The wiki API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Authorization Guard
  app.useGlobalGuards(new RolesGuard(new Reflector()));

  // ID ObjectId Interceptor
  app.useGlobalInterceptors(new IdParamInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
