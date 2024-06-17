import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EquipamentModule } from './equipament/equipament.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), CustomerModule, AuthModule, EquipamentModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

