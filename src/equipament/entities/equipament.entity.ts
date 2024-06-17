import { ApiProperty } from "@nestjs/swagger";
import { Equipament } from "@prisma/client";

export class EquipamentEntity implements Equipament {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    totalAmount: number;

    @ApiProperty()
    availableAmount: number;
    
}