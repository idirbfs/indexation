import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextProcessingModule } from './text-processing/text-processing.module';
import { VisualisationModule } from './visualisation/visualisation.module';
import { databaseProviders } from './database/database.provider';

@Module({
  imports: [TextProcessingModule, VisualisationModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
