import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";


export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon extends Document {

    @Prop({ unique: true, index: true, required: true })
    namepokemon: string;

    @Prop({ unique: true, index: true, required: true })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
