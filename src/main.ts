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
        forbidNonWhitelisted: true
      })
    )

    await app.listen(process.env.port ?? 3000);

  } catch (err: unknown) {
    throw new NotFoundException(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Main();



