import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {

    @IsString() @MinLength(1)
    public namepokemon: string;

    @IsInt() @IsPositive()
    public no: number;
}
