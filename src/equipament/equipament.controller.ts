import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { EquipamentService } from './equipament.service';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IncreaseAmountDto } from './dto/increase-equipament.dto';
import { RentEquipamentDto } from './dto/rent-equipament.dto';
import AuthenticatedRequest from 'src/auth/interfaces/authenticated-request.interface';
import { ReturnEquipamentDto } from './dto/return-equipament.dto';

@Controller('equipament')
export class EquipamentController {
  constructor(private readonly equipamentService: EquipamentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createEquipamentDto: CreateEquipamentDto) {
    return this.equipamentService.create(createEquipamentDto);
  }

  @Patch(':id/increase-amount')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  increaseAmount(
    @Param('id', ParseIntPipe) equipamentId: number,
    @Body() increaseAmountDto: IncreaseAmountDto,
  ) {
    return this.equipamentService.IncreaseAmountOfEquipament(equipamentId, increaseAmountDto.quantityAdded);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.equipamentService.findAll();
  }

  @Post(':equipamentId/rent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async rentEquipament(
    @Req() req: AuthenticatedRequest,
    @Param('equipamentId', ParseIntPipe) equipamentId: number,
    @Body() rentEquipamentDto: RentEquipamentDto,
  ) {
    const customer = req.user;
    const { quantity } = rentEquipamentDto;

    return this.equipamentService.rentEquipament(customer.id, equipamentId, quantity);
  }

  @Post(':rentalId/return')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async returnEquipament(
    @Req() req: AuthenticatedRequest,
    @Param('rentalId', ParseIntPipe) rentalId: number,
    @Body() returnEquipamentDto: ReturnEquipamentDto,
  ) {
    const { quantity } = returnEquipamentDto;
    const customer = req.user;

    return this.equipamentService.returnEquipament(customer.id, rentalId, quantity);
  }

}





 // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.equipamentService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateEquipamentDto: UpdateEquipamentDto) {
  //   return this.equipamentService.update(id, updateEquipamentDto);
  // }