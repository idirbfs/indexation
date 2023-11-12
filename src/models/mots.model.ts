import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Mot extends Model {
  @Column(DataType.STRING)
  mot: string;
}
