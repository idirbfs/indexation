import { Sequelize } from 'sequelize-typescript';
interface Lemma {
    ortho: string;
    lemme: string;
}
export declare class TextProcessingService {
    private sequelize;
    constructor(sequelize: Sequelize);
    fetchText(): Promise<string>;
    filterText(text: string): Promise<string[]>;
    lemmatizeText(text: string[]): Promise<string[]>;
    lemmatizeWord(word: string, lemmas: Lemma[]): string;
    countOccurs(lemmatizedwords: string[]): {
        [key: string]: number;
    };
    indexFilesInDirectory(directoryPath: string): Promise<void>;
    storeDataInDatabase(fileName: string, filePath: string, lemmatizedText: string[], text: string, occurrences: {
        [key: string]: number;
    }): Promise<void>;
}
export {};
