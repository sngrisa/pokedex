/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundException, ValidationPipe } from '@nestjs/common';

const Main = async (): Promise<void> => {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v2');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions:{
          enableImplicitConversion: true
        }
      })
    )

    await app.listen(process.env.port ?? 4100);
    console.info(`Backend Pokedex running on port ${process.env.port}`)
  } catch (err: unknown) {
    throw new NotFoundException(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Main();



