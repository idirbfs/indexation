import { Model } from 'sequelize-typescript';
import { Mot } from './mots.model';
import { Document } from './documents.model';
export declare class Occurrence extends Model {
    id_mot: number;
    id_document: number;
    occurrence: number;
    mot: Mot;
    document: Document;
}
