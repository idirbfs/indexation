import { Controller, Get, HttpStatus, Render } from '@nestjs/common';
import { TextProcessingService } from './text-processing.service';

@Controller('text-processing')
export class TextProcessingController {
  constructor(private readonly textProcessingService: TextProcessingService) {}

  @Get()
  async processTxt() {
    await this.textProcessingService.indexFilesInDirectory('../../docs');
    return { response: HttpStatus.OK };
  }
}
