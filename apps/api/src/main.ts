import { environment } from './environments/environment';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';

  // Documentation
  const options = new DocumentBuilder()
    .setTitle('Shepherd API')
    .setDescription('Shepherd API description')
    .setVersion('1.0')
    .setBasePath('/api')
    .addBearerAuth()
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  app.use(require('./app/auth/keycloak').keycloak.middleware());

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
