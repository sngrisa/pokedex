import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto, UpdatePokemonDto } from './dto/index.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { Response } from 'express';


@Injectable()
export class PokemonService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto, @Res() response: Response): Promise<void> {
    try {
      createPokemonDto.namepokemon = createPokemonDto.namepokemon.toLowerCase();
      response.status(201).json({
        ok: true,
        msg: "Data created in database !!!!",
        createPokemonDto
      })
      await this.pokemonModel.create(createPokemonDto);
    } catch (err: any) { this.handledErrors(err); }
  }

  async findAll(@Res() response: Response): Promise<Pokemon[] | any> {
    try {
      let data: Pokemon[] = await this.pokemonModel.find({});
      response.status(201).json({
        ok: true,
        msg: "Results found!!!!",
        data
      })
      return data;
    } catch (err: any) { this.handledErrors(err); }
  }

  async findOne(str: string): Promise<Pokemon | any> {
    try {
      return (!isNaN(+str)) ? await this.pokemonModel.findOne({ no: str }) : isValidObjectId(str) ? await this.pokemonModel.findById({ _id: str }) : await this.pokemonModel.findOne({ namepokemon: str.trim().toLocaleLowerCase() });
    } catch (err: any) { this.handledErrors(err); }
  }


  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<JSON | unknown> {
    try {
      let pokemon: Pokemon | null = await this.findOne(term);
      if (updatePokemonDto.namepokemon) updatePokemonDto.namepokemon = updatePokemonDto.namepokemon.toLowerCase();
      await pokemon?.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon?.toJSON(), ...updatePokemonDto }
    } catch (err: any) { this.handledErrors(err); }
  }

  async remove(term: string): Promise<unknown> {
    try {
      let { deletedCount } = await this.pokemonModel.deleteOne({ _id: term });
      if (deletedCount === 0) { throw new NotFoundException(`Pokemon not found in database with _id: ${term}`) }
      return;
    } catch (err: any) { this.handledErrors(err); }
  }

  private handledErrors(err: any): any {
    if (err === 11000) { throw new BadRequestException(`Data exists in database with ${JSON.stringify(err.keyValue)}`) };
    throw new InternalServerErrorException(`Error in server ${err.message}`);
  }
}
