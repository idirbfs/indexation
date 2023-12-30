import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Mot } from '../models/mots.model';
import { Occurrence } from 'src/models/occurences.model';
import { Document } from 'src/models/documents.model';

@Injectable()
export class MotsService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}
  async getAllMots() {
    return await Occurrence.findAll({ include: [Mot, Document] });
  }

  async getSearchedMots(mot: string) {
    return await Occurrence.findAll({
      where: {},
      include: [
        {
          model: Mot,
          where: {
            mot: mot,
          },
        },
        {
          model: Document,
        },
      ],
    });
  }
}
