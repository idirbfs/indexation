import { Model } from 'sequelize-typescript';
export declare class Document extends Model {
    titre: string;
    contenu: string;
    contenu_lemmatisee: string;
    chemin: string;
}
