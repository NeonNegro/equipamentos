import { Module } from '@nestjs/common';
import { EquipamentService } from './equipament.service';
import { EquipamentController } from './equipament.controller';
import { PrismaService } from 'src/prisma.service';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  controllers: [EquipamentController],
  providers: [EquipamentService, PrismaService],
  exports: [EquipamentService],
})
export class EquipamentModule {}