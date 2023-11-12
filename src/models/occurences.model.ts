import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Mot } from './mots.model';
import { Document } from './documents.model';

@Table
export class Occurrence extends Model {
  @ForeignKey(() => Mot)
  @Column
  id_mot: number;

  @ForeignKey(() => Document)
  @Column
  id_document: number;

  @Column
  occurrence: number;

  @BelongsTo(() => Mot)
  mot: Mot;

  @BelongsTo(() => Document)
  document: Document;
}
