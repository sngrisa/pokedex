import { IsInt, IsPositive, IsString, MinLength} from "class-validator";

export class CreatePokemonDto {

    @IsString() @MinLength(2)
    public namepokemon: string;

    @IsInt() @IsPositive()
    public no: number;
}
