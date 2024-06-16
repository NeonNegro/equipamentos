import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(11)
    cpf: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;


}
