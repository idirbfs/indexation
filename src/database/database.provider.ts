import { Sequelize } from 'sequelize-typescript';
import { Mot } from '../models/mots.model';
import { Document } from '../models/documents.model';
import { Occurrence } from '../models/occurences.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'myrootpassword',
        database: 'indexation',
      });
      sequelize.addModels([Mot, Document, Occurrence]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
