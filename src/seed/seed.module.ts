import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService, AxiosAdapter],
  exports:[
    SeedService
  ],
  imports:[
    PokemonModule,
    CommonModule
  ]
})
export class SeedModule {}
