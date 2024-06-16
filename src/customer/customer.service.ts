import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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
    return this.prisma.customer.findUnique({ where: { id: Number(id) } });
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

  async findUserByCredentials(cpf: string, email: string) {
    return this.prisma.customer.findFirst({
      where: { OR: [
        { email },
        { cpf},
      ]}
    })
  }

  async ensureUniqueCustomerCredentials (cpf: string, email: string) {
    const existingCustomer = await this.findUserByCredentials(cpf, email);
    if (existingCustomer)
      throw new ConflictException('Usuário já cadastrado')
  }
}
