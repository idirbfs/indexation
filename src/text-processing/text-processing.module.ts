import { Module } from '@nestjs/common';
import { TextProcessingService } from './text-processing.service';
import { TextProcessingController } from './text-processing.controller';
import { databaseProviders } from '../database/database.provider';

@Module({
  providers: [TextProcessingService, ...databaseProviders],
  controllers: [TextProcessingController],
})
export class TextProcessingModule {}
