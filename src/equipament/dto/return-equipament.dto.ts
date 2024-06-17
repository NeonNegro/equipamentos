// src/equipament/dto/return-equipament.dto.ts
import { IsInt, IsPositive } from 'class-validator';

export class ReturnEquipamentDto {
  @IsInt()
  @IsPositive()
  quantity: number;
}