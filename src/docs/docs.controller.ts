import { Controller, Get, Param } from '@nestjs/common';
import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  async getAllDocs() {
    return this.docsService.getAllDocs();
  }

  @Get(':id')
  async getDocById(@Param('id') id: number) {
    return this.docsService.getDocById(id);
  }
}
