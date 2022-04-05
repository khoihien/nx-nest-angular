/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { appConfig, AppConfig } from '@nx-nest-angular/api-server/utils-config';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(appConfig.KEY);

  app.enableCors();
  app.enableShutdownHooks();
  app.use(helmet());
  app.use(compression());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('API Server')
    .setVersion('1.0.0')
    .addServer(config.appDomain, 'Development Api')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(config.port, () => {
    console.log(`Api Server listen at ${config.appDomain}/${globalPrefix}`);
    console.log(
      `Swagger Docs enabled at ${config.appDomain}/${globalPrefix}/docs`
    );
  });
}

bootstrap();
