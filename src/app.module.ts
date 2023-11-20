import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextProcessingModule } from './text-processing/text-processing.module';
import { VisualisationModule } from './visualisation/visualisation.module';

@Module({
  imports: [TextProcessingModule, VisualisationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
