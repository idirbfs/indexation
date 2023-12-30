import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();

// main.ts
/*
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useStaticAssets('public'); // Assuming your public assets are in the 'public' folder
  app.setBaseViewsDir('views'); // Assuming your views are in the 'views' folder
  app.setViewEngine('hbs');

  await app.listen(3000);
}

bootstrap();
*/

// main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import * as hbs from 'hbs';
// import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   app.useStaticAssets(join(__dirname, '..', 'public'));
//   app.setBaseViewsDir(join(__dirname, '..', 'views'));
//   app.setViewEngine('hbs');

//   await app.listen(3000);
// }

// bootstrap();
