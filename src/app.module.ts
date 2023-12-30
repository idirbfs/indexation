import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextProcessingModule } from './text-processing/text-processing.module';
import { databaseProviders } from './database/database.provider';
import { DocsModule } from './docs/docs.module';
import { MotsController } from './mots/mots.controller';
import { MotsService } from './mots/mots.service';
import { MotsModule } from './mots/mots.module';

@Module({
  imports: [TextProcessingModule, DocsModule, MotsModule],
  controllers: [AppController, MotsController],
  providers: [AppService, ...databaseProviders, MotsService],
})
export class AppModule {}
