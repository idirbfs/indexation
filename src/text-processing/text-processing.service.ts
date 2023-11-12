import { Injectable } from '@nestjs/common';
import { promises as fsPromisses, createReadStream } from 'fs';
import * as path from 'path';
import { STOP_WORDS } from 'src/constants/stop-words.constant';

import * as fastCsv from 'fast-csv';

interface Lemma {
  ortho: string;
  lemme: string;
}

@Injectable()
export class TextProcessingService {
  async fetchText(): Promise<string> {
    const filePath = path.resolve(__dirname, '../../../text/text.txt');
    const text = await fsPromisses.readFile(filePath, 'utf8');

    return text;
  }

  //transform text to array of words
  async filterText(text: string): Promise<string[]> {
    //remplace' la ponctuation avec des espaces
    text = text.replace(/[^a-zA-ZÀ-ÿ-\s]/g, ' ');

    //construire un tableau a partir de la chaine
    let transformedText = text.split(/\s+/);
    console.log(transformedText);

    //mettre tout les mots en miniscule
    transformedText = transformedText.map((word) => word.toLowerCase());

    //enlever les espaces avant et après les mots
    transformedText = transformedText.map((word) => word.trim());

    //supprimer le chaines  length < 2
    transformedText = transformedText.filter((word) => word.length > 2);

    //filter le tableau avec la stop list
    transformedText = transformedText.filter(
      (element) => !STOP_WORDS.includes(element),
    );

    //

    return transformedText;
  }

  lemmatizeText(text: string[]): Promise<string[]> {
    const filePath = path.resolve(__dirname, '../../../src/assets/lemmas.csv');
    const lemmas: Lemma[] = [];

    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      fastCsv
        .parseStream(stream, { headers: true })
        .on('data', (data: Lemma) => {
          lemmas.push(data);
        })
        .on('end', () => {
          console.log('CSV reading finished');
          const lemmatizedText = text.map((word) =>
            this.lemmatizeWord(word, lemmas),
          );
          resolve(lemmatizedText);
        })
        .on('error', (error) => {
          console.error('Error reading CSV:', error);
          reject(error);
        });
    });
  }

  lemmatizeWord(word: string, lemmas: Lemma[]): string {
    const lemmaEntry = lemmas.find(
      (lemma) => lemma.ortho.toLowerCase() === word.toLowerCase(),
    );
    return lemmaEntry ? lemmaEntry.lemme : word;
  }

  countOccurs(lemmatizedwords: string[]) {
    const occurrences: { [key: string]: number } = {};

    lemmatizedwords.forEach((element) => {
      if (occurrences[element]) {
        occurrences[element]++;
      } else {
        occurrences[element] = 1;
      }
    });

    return occurrences;
  }
}
