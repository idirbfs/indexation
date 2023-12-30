import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { databaseProviders } from '../database/database.provider';

@Module({
  providers: [DocsService, ...databaseProviders],
  controllers: [DocsController],
})
export class DocsModule {}
