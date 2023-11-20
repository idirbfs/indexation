import { Module } from '@nestjs/common';
import { VisualisationService } from './visualisation.service';
import { VisualisationController } from './visualisation.controller';

@Module({
  providers: [VisualisationService],
  controllers: [VisualisationController],
})
export class VisualisationModule {}
