import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import {Mots } from "./models/mots.model";
import { Sequelize } from 'sequelize-typescript';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('SEQUELIZE')
  private sequelize: Sequelize,) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Render('home')
  @Get()
  async root() {
    const words = await Mots.findAll();
    return { words };
  }
}
