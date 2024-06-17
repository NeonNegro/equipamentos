import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";

export class CreateEquipamentDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    name: string;

    @IsInt()
    @IsPositive()
    @ApiProperty()
    totalAmount: number;

}
