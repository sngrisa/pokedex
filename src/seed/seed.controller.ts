import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  excuteSEED() {
    return this.seedService.executeSeed();
  }

  @Get(':page')
  excuteNextPokemon(@Param(':page') page: number){
    return this.seedService.nextPokemon(page);
  }

}
