import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "@prisma/client";

export class CustomerEntity implements Customer {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

}