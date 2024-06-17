import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return new CustomerEntity( await this.customerService.create(createCustomerDto)) ;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    const customers = await this.customerService.findAll();
    return customers.map((c) => new CustomerEntity(c)) 
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new CustomerEntity(await this.customerService.findOne(id));
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}
