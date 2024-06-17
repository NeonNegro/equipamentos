import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class IncreaseAmountDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  quantityAdded: number;
}