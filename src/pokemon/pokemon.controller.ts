import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';;
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) { }

  @Post()
  acreate(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.pokemonService.findAll(paginationDto);
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
