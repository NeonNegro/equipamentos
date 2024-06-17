import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EquipamentService {
  constructor(private prisma: PrismaService){}

  async create(createEquipamentDto: CreateEquipamentDto) {

    await this.ensureUniqueEquipament(createEquipamentDto.name);

    return this.prisma.equipament.create({data: createEquipamentDto})
  }

  async rentEquipament(customerId: number, equipamentId: number) {

    const rental = await this.prisma.$transaction(async (tx) => {
      
        await this.ensureEquipamentIsAvailable(equipamentId);

        return await this.prisma.rental.create({
          data: {
            customerId,
            equipamentId,
            rentalDate: new Date(),
          },
        });
    })
  
    return rental

  }

  async ensureUniqueEquipament (name: string) {
    const existingEquipament = await this.prisma.equipament.findFirst({where:{name}}) 
    
    if (existingEquipament)
      throw new ConflictException('Equipamento já cadastrado')
  }

  async ensureEquipamentIsAvailable (id: number) {
    const equipament = await this.prisma.equipament.findUnique({
      where:{ id },
      include:{ rentals: true},
    }) 
    
    if (!equipament)
      throw new NotFoundException('Equipamento não existe');

    if (equipament.rentals.length >= equipament.amount)
      throw new ConflictException('Equipamento não disponível')
  }
}
