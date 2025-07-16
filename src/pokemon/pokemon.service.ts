import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto, UpdatePokemonDto } from './dto/index.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDTO } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PokemonService {

  private defaultsOffsetAndLimit: number[] = []; 

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly envConfig: ConfigService
  ) {
    this.defaultsOffsetAndLimit.push(Number(this.envConfig.get<number>('defaultLimit')))
    this.defaultsOffsetAndLimit.push(Number(this.envConfig.get<number>('defaultOffset')))
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<void> {
    try {
      createPokemonDto.namepokemon = createPokemonDto.namepokemon.toLowerCase();
      await this.pokemonModel.create(createPokemonDto);
    } catch (err: any) { this.handledErrors(err); }
  }

  async findAll({ limit = this.defaultsOffsetAndLimit[0], offset = this.defaultsOffsetAndLimit[1]}: PaginationDTO): Promise<Pokemon[] | any> {
    try {
      let data: Pokemon[] = await this.pokemonModel.find()
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ no: 1 })
        .select('-__v');
      return data;
    } catch (err: any) { this.handledErrors(err); }
  }

  async findOne(str: string): Promise<Pokemon | any> {
    try {
      return (!isNaN(+str)) ? await this.pokemonModel.findOne({ no: str }).sort({no: 1}).select('-__v') : isValidObjectId(str) ? await this.pokemonModel.findById({ _id: str }).sort({no: 1}).select('-__v') : await this.pokemonModel.findOne({ namepokemon: str.trim().toLocaleLowerCase() }).sort({no: 1}).select('-__v');
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
