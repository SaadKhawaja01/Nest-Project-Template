import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { InjectAuthUserInterceptor } from './core/interceptors/inject-auth-user.interceptor';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new InjectAuthUserInterceptor());
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.port || 3000);
}
bootstrap();
