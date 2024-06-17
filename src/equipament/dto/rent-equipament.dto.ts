import { IsInt, IsPositive } from 'class-validator';

export class RentEquipamentDto {
  
  @IsInt()
  @IsPositive()
  quantity: number;
}