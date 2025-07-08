import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Response } from 'express';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) { }

  @Post()
  acreate(@Body() createPokemonDto: CreatePokemonDto, @Res() res: Response) {
    return this.pokemonService.create(createPokemonDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.pokemonService.findAll(res);
  }

  @Get(':str')
  findOne(@Param('str') str: string) {
    return this.pokemonService.findOne(str);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':term')
  remove(@Param('term', ParseMongoIdPipe) term: string) {
    return this.pokemonService.remove(term);
  }
}
