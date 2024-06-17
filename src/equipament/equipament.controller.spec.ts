import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentController } from './equipament.controller';
import { EquipamentService } from './equipament.service';

describe('EquipamentController', () => {
  let controller: EquipamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentController],
      providers: [EquipamentService],
    }).compile();

    controller = module.get<EquipamentController>(EquipamentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
