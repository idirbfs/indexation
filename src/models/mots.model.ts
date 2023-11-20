import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';

@Table
export class Mot extends Model {
  @Unique
  @Column(DataType.STRING)
  mot: string;
}
