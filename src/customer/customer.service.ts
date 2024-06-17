import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

export const salt = 10;

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService){}

  async findAll(){
    return this.prisma.customer.findMany()
  }

  async findOne(id: number) {
    return this.prisma.customer.findUnique({ 
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
      }, 
    });
  }

  async create(createCustomerDto: CreateCustomerDto) {

    await this.ensureUniqueCustomerCredentials(createCustomerDto.cpf, createCustomerDto.email);

    const hashedPassword = await bcrypt.hash(
      createCustomerDto.password,
      salt,
    )

    createCustomerDto.password = hashedPassword;

    return this.prisma.customer.create({data: createCustomerDto})
  }

  async findCustomerByCredentials(cpf: string, email: string) {
    return this.prisma.customer.findFirst({
      where: { OR: [
        { email },
        { cpf},
      ]}
    })
  }

  async ensureUniqueCustomerCredentials (cpf: string, email: string) {
    const existingCustomer = await this.findCustomerByCredentials(cpf, email);
    if (existingCustomer)
      throw new ConflictException('Usuário já cadastrado')
  }
  async ensureCustomerExists (id: number){
    const customer = await this.prisma.customer.findUnique({
      where:{ id },
    }) 
    
    if (!customer) throw new NotFoundException('Usuario não existe');
  }
}
