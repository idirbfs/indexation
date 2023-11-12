import { Module } from '@nestjs/common';
import { TextProcessingService } from './text-processing.service';
import { TextProcessingController } from './text-processing.controller';

@Module({
  providers: [TextProcessingService],
  controllers: [TextProcessingController],
})
export class TextProcessingModule {}
