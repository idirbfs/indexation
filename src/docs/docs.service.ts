import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Mot } from '../models/mots.model';
import { Document } from '../models/documents.model';
import { Occurrence } from '../models/occurences.model';

@Injectable()
export class DocsService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}
  async getAllDocs() {
    return await Document.findAll();
  }

  async getDocById(id: number) {
    return await Document.findOne({ where: { id } });
  }
}
