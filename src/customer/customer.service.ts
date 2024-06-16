import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService){}

  async findAll(){
    return this.prisma.customer.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.customer.findUnique({ where: { id: Number(id) } });
  }

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({data: createCustomerDto})
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
