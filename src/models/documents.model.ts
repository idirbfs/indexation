import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Document extends Model {
  @Column(DataType.STRING)
  titre: string;
  contenu: string;
  chemin: string;
}
