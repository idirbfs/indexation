import { Injectable, Inject } from '@nestjs/common';
import {
  promises as fsPromisses,
  createReadStream,
  readdirSync,
  statSync,
} from 'fs';
import * as path from 'path';
import { STOP_WORDS } from 'src/constants/stop-words.constant';

import * as fastCsv from 'fast-csv';

import { Sequelize } from 'sequelize-typescript';
import { Mot } from '../models/mots.model';
import { Document } from '../models/documents.model';
import { Occurrence } from '../models/occurences.model';

interface Lemma {
  ortho: string;
  lemme: string;
}

@Injectable()
export class TextProcessingService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {
    // ...
  }

  async fetchText(): Promise<string> {
    console.log('fetching text');

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
    const filePath = path.resolve(
      '/home/idir/Documents/GitHub/indexation/src/assets/lemmas.csv',
    );
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

  // async indexFilesInDirectory(directoryPath: string): Promise<void> {
  //   directoryPath = path.resolve(__dirname, directoryPath);
  //   const files = readdirSync(directoryPath);

  //   for (const file of files) {
  //     const filePath = `${directoryPath}/${file}`;

  //     if (statSync(filePath).isDirectory()) {
  //       // Si c'est un dossier, appelle récursivement la fonction pour ce dossier.
  //       console.log(`Indexing directory: ${filePath}`);
  //       await this.indexFilesInDirectory(filePath);
  //     } else if (file.endsWith('.txt')) {
  //       // Si c'est un fichier txt, effectue ton traitement d'indexation ici.
  //       console.log(`Indexing file: ${filePath}`);
  //       // Ajoute ici le code pour l'analyse du fichier txt.
  //     }
  //   }
  // }

  async indexFilesInDirectory(directoryPath: string): Promise<void> {
    directoryPath = path.resolve(__dirname, directoryPath);
    const files = readdirSync(directoryPath);

    for (const file of files) {
      const filePath = `${directoryPath}/${file}`;

      if (statSync(filePath).isDirectory()) {
        await this.indexFilesInDirectory(filePath);
      } else if (file.endsWith('.txt')) {
        const document = await Document.findOne({
          where: { chemin: filePath },
        });

        if (!document) {
          const fileText = await fsPromisses.readFile(filePath, 'utf8');

          const filteredText = await this.filterText(fileText);

          const lemmatizedText = await this.lemmatizeText(filteredText);

          const occurrences = this.countOccurs(lemmatizedText);

          await this.storeDataInDatabase(
            file,
            filePath,
            lemmatizedText,
            fileText,
            occurrences,
          );
        }
      }
    }
  }

  async storeDataInDatabase(
    fileName: string,
    filePath: string,
    lemmatizedText: string[],
    text: string,
    occurrences: { [key: string]: number },
  ): Promise<void> {
    try {
      const [document, createdDocument] = await Document.upsert({
        titre: fileName,
        contenu: lemmatizedText.join(' '),
        contenu_lemmatisee: text,
        chemin: filePath,
      });

      if (createdDocument) {
        for (const [word, count] of Object.entries(occurrences)) {
          const [mot, createdMot] = await Mot.upsert({ mot: word });
          await Occurrence.upsert({
            id_mot: mot.id,
            id_document: document.id,
            occurrence: count,
          });
        }
      }
    } catch (error) {
      console.error('Error storing data in the database:', error);
      throw error;
    }
  }
}
