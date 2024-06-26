import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "@prisma/client";
import { Exclude } from "class-transformer";

export class CustomerEntity implements Customer {
    constructor(partial: Partial<CustomerEntity>) {
        Object.assign(this, partial)
    }
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;
}