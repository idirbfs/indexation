import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';

@Table
export class Document extends Model {
  @Column(DataType.STRING)
  titre: string;

  @Column(DataType.TEXT)
  contenu: string;

  @Column(DataType.TEXT)
  contenu_lemmatisee: string;

  @Unique
  @Column(DataType.STRING)
  chemin: string;
}
