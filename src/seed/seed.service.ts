import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Seed } from './interface/seed.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private http: AxiosAdapter
  ) { }

  url: string = "https://pokeapi.co/api/v2/";
  limit: number = 20;

  async executeSeed(): Promise<void> {
    try {
      await this.pokemonModel.deleteMany({});

      let data = await this.http.get<any>(`${this.url}/pokemon`);

      let insertPokemon: { namepokemon: string, no: number }[] = [];

      data.results.forEach(({ name, url }) => {
        const segments: string[] = url.split("/");
        let no: number = +segments[segments.length - 2];
        let namepokemon: string = name;
        insertPokemon.push({ namepokemon, no });
      })

      await this.pokemonModel.insertMany(insertPokemon);

      return data?.results;

    } catch (err: unknown) {
      throw new BadRequestException('Resource not found!!!');
    }
  }


  async executeSeedII(): Promise<void> { //Insert multples data with array promise
    try {
      await this.pokemonModel.deleteMany({});

      let data = await this.http.get<any>(`${this.url}/pokemon`);

      let insertPokemon: Promise<Pokemon>[] = [];

      data.results.forEach(({ name, url }) => {
        const segments: string[] = url.split("/");
        let no: number = +segments[segments.length - 2];
        let namepokemon: string = name;
        insertPokemon.push(this.pokemonModel.create({ namepokemon, no }));
      })

      await Promise.all(insertPokemon);

      return data?.results;
    } catch (err: unknown) {
      throw new BadRequestException('Resource not found!!!');
    }
  }

  async nextPokemon(pagination: number): Promise<void>{
    try{
      await this.pokemonModel.deleteMany({});

      let data = await this.http.get<any>(`${this.url}/pokemon?offset=${pagination}&limit=${this.limit}`);

      let insertPokemon: { namepokemon: string, no: number }[] = [];

      data.results.forEach(({ name, url }) => {
        const segments: string[] = url.split("/");
        let no: number = +segments[segments.length - 2];
        let namepokemon: string = name;
        insertPokemon.push({ namepokemon, no });
      })

      await this.pokemonModel.insertMany(insertPokemon);

      return data.results;
    }catch(err: unknown){
      throw new NotFoundException('Pokemons not found!!!');
    }
  }
}
