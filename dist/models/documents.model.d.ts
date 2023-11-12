import { Model } from 'sequelize-typescript';
export declare class Document extends Model {
    titre: string;
    contenu: string;
    chemin: string;
}
