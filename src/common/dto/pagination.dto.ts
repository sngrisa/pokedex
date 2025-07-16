import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDTO{

    @IsPositive() @IsOptional()
    @Min(1) @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;
}