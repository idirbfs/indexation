import { Controller, Get, Render, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Mot } from './models/mots.model';
import { Document } from './models/documents.model';
import { Sequelize } from 'sequelize-typescript';
import { Occurrence } from './models/occurences.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}
}
