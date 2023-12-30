import { Module } from '@nestjs/common';
import { MotsService } from './mots.service';
import { MotsController } from './mots.controller';
import { databaseProviders } from '../database/database.provider';

@Module({
  providers: [MotsService, ...databaseProviders],
  controllers: [MotsController],
})
export class MotsModule {}
