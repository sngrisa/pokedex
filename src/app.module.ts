/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({ 
         rootPath: join(__dirname,'..','public'), 
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
