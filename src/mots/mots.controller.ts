import { Controller, Get, Param } from '@nestjs/common';
import { MotsService } from './mots.service';

@Controller('mots')
export class MotsController {
  constructor(private readonly motsService: MotsService) {}

  @Get(':mot')
  async getSearchedMots(@Param('mot') mot: string) {
    // Your logic to handle the search query
    return this.motsService.getSearchedMots(mot);
  }

  @Get()
  async getAllMots() {
    return this.motsService.getAllMots();
  }
}
