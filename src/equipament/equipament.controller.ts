import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EquipamentService } from './equipament.service';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { UpdateEquipamentDto } from './dto/update-equipament.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('equipament')
export class EquipamentController {
  constructor(private readonly equipamentService: EquipamentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createEquipamentDto: CreateEquipamentDto) {
    return this.equipamentService.create(createEquipamentDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // findAll() {
  //   return this.equipamentService.findAll();
  // }

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
}