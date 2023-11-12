interface Lemma {
    ortho: string;
    lemme: string;
}
export declare class TextProcessingService {
    fetchText(): Promise<string>;
    filterText(text: string): Promise<string[]>;
    lemmatizeText(text: string[]): Promise<string[]>;
    lemmatizeWord(word: string, lemmas: Lemma[]): string;
    countOccurs(lemmatizedwords: string[]): {
        [key: string]: number;
    };
}
export {};
