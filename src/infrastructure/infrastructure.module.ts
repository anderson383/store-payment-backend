import {
  ConfigModule, ConfigService
} from '@nestjs/config';
import { dataBaseConfigFactory } from './config/data-base.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingModule } from './modules/billing/billing.module';
import { InventaryModule } from './modules/inventary/inventary.module';

@Module({imports: [
  TypeOrmModule.forRootAsync({
    useFactory: dataBaseConfigFactory,
    inject: [ConfigService]
  }),
  ConfigModule.forRoot({
    envFilePath: `env/${ process.env.NODE_ENV }.env`,
    isGlobal: true
  }),
  BillingModule,
  InventaryModule
] })
export class InfrastructureModule {}
