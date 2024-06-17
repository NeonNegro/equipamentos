import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { PrismaService } from 'src/prisma.service';
import { Equipament, Prisma, PrismaClient, TransactionType } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class EquipamentService {
  constructor(private prisma: PrismaService){}

  async findAll(){
    return this.prisma.equipament.findMany()
  }

  async create(createEquipamentDto: CreateEquipamentDto) {

    await this.ensureUniqueEquipament(createEquipamentDto.name);

    return this.prisma.equipament.create({
      data: {
        ...createEquipamentDto, 
        availableAmount: createEquipamentDto.totalAmount
      } 
    })
  }

  async rentEquipament(customerId: number, equipamentId: number, equipamentQuantity: number) {

    const rental = await this.prisma.$transaction(async (tx) => {
      
        await this.ensureEquipamentExists(equipamentId, tx);

        const requestedEquipament = await this.updateAvailableAmountOfEquipments(equipamentId, equipamentQuantity, 'decrement', tx);
        await this.ensureEquipamentIsAvailable(requestedEquipament, equipamentQuantity);

        return tx.rental.create({
          data: {
            customerId,
            equipamentId,
            quantity: equipamentQuantity,
            transactionType: TransactionType.out,
            transactionDate: new Date(),
          },
        });
    })
  
    return rental
  }

  async returnEquipament(customerId: number, rentalId: number, equipamentQuantity: number) {
    
    const returned = await this.prisma.$transaction(async (tx) => {
      const rental = await this.ensureRentalExists(rentalId, customerId, tx);

      await this.updateAvailableAmountOfEquipments(rental.equipamentId, equipamentQuantity, 'increment', tx);

      await this.validateReturnQuantity(customerId, rental.equipamentId, equipamentQuantity, tx);

      return tx.rental.create({
        data: {
          customerId: rental.customerId,
          equipamentId: rental.equipamentId,
          quantity: equipamentQuantity,
          transactionType: TransactionType.in,
        },
      });
    });

    return returned;
  }

  async IncreaseAmountOfEquipament(equipamentId: number, quantityAdded: number,  channel: PrismaClientType = this.prisma){
    await this.ensureEquipamentExists(equipamentId);

    return (channel || this.prisma).equipament.update({
      where: {id: equipamentId},
      data: {
        totalAmount: {increment: quantityAdded},
        availableAmount: {increment: quantityAdded},
      }
    })
  }

  async updateAvailableAmountOfEquipments(equipamentId: number, equipamentQuantity: number, 
    operation: 'increment' | 'decrement',  channel: PrismaClientType = this.prisma) {

    await this.ensureEquipamentExists(equipamentId);
  
    return (channel || this.prisma).equipament.update({
      where: { id: equipamentId },
      data: { availableAmount: { [operation]: equipamentQuantity }}
    });
  }

  async ensureRentalExists(id: number, customerId: number, channel: PrismaClientType = this.prisma)  {
    const rental = await (channel || this.prisma).rental.findUnique({ where: { id, customerId } });
    if (!rental)
      throw new NotFoundException('Registro de aluguel não encontrado');
    return rental
  }
  async ensureUniqueEquipament (name: string, channel: PrismaClientType = this.prisma) {
    const existingEquipament = await (channel || this.prisma).equipament.findFirst({where:{name}}) 
    
    if (existingEquipament) throw new ConflictException('Equipamento já cadastrado')
  }
  async ensureEquipamentIsAvailable (requestedEquipament: Equipament, qtd: number) {
    if (requestedEquipament.availableAmount <= 0) throw new ConflictException('Quantidade de equipamento não disponível')
  }
  async ensureEquipamentExists (id: number, channel: PrismaClientType = this.prisma){
    const equipament = await (channel || this.prisma).equipament.findUnique({
      where:{ id },
      include:{ rentals: true},
    }) 
    
    if (!equipament) throw new NotFoundException('Equipamento não existe');
  }
  async validateReturnQuantity(customerId: number, equipamentId: number, equipamentQuantity: number, 
    channel: PrismaClientType = this.prisma) {
    const totalTook = await (channel || this.prisma).rental.aggregate({
        where: {
            customerId,
            equipamentId,
            transactionType: 'out',
        },
        _sum: {
            quantity: true,
        },
    });

    const totalReturned = await this.prisma.rental.aggregate({
        where: {
            customerId,
            equipamentId,
            transactionType: 'in',
        },
        _sum: {
            quantity: true,
        },
    });

    const totalTookQty = totalTook._sum?.quantity || 0;
    const totalReturnedQty = totalReturned._sum?.quantity || 0;

    if (totalReturnedQty + equipamentQuantity > totalTookQty) {
        throw new ConflictException('A quantidade devolvida excede a quantidade alugada');
    }
}
}


type PrismaClientType = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;