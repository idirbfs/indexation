"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProcessingService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
const stop_words_constant_1 = require("../constants/stop-words.constant");
const fastCsv = require("fast-csv");
const sequelize_typescript_1 = require("sequelize-typescript");
const mots_model_1 = require("../models/mots.model");
const documents_model_1 = require("../models/documents.model");
const occurences_model_1 = require("../models/occurences.model");
let TextProcessingService = class TextProcessingService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async fetchText() {
        console.log('fetching text');
        const filePath = path.resolve(__dirname, '../../../text/text.txt');
        const text = await fs_1.promises.readFile(filePath, 'utf8');
        return text;
    }
    async filterText(text) {
        text = text.replace(/[^a-zA-ZÀ-ÿ-\s]/g, ' ');
        let transformedText = text.split(/\s+/);
        transformedText = transformedText.map((word) => word.toLowerCase());
        transformedText = transformedText.map((word) => word.trim());
        transformedText = transformedText.filter((word) => word.length > 2);
        transformedText = transformedText.filter((element) => !stop_words_constant_1.STOP_WORDS.includes(element));
        return transformedText;
    }
    lemmatizeText(text) {
        const filePath = path.resolve('/home/idir/Documents/GitHub/indexation/src/assets/lemmas.csv');
        const lemmas = [];
        const stream = (0, fs_1.createReadStream)(filePath);
        return new Promise((resolve, reject) => {
            fastCsv
                .parseStream(stream, { headers: true })
                .on('data', (data) => {
                lemmas.push(data);
            })
                .on('end', () => {
                console.log('CSV reading finished');
                const lemmatizedText = text.map((word) => this.lemmatizeWord(word, lemmas));
                resolve(lemmatizedText);
            })
                .on('error', (error) => {
                console.error('Error reading CSV:', error);
                reject(error);
            });
        });
    }
    lemmatizeWord(word, lemmas) {
        const lemmaEntry = lemmas.find((lemma) => lemma.ortho.toLowerCase() === word.toLowerCase());
        return lemmaEntry ? lemmaEntry.lemme : word;
    }
    countOccurs(lemmatizedwords) {
        const occurrences = {};
        lemmatizedwords.forEach((element) => {
            if (occurrences[element]) {
                occurrences[element]++;
            }
            else {
                occurrences[element] = 1;
            }
        });
        return occurrences;
    }
    async indexFilesInDirectory(directoryPath) {
        directoryPath = path.resolve(__dirname, directoryPath);
        const files = (0, fs_1.readdirSync)(directoryPath);
        for (const file of files) {
            const filePath = `${directoryPath}/${file}`;
            if ((0, fs_1.statSync)(filePath).isDirectory()) {
                await this.indexFilesInDirectory(filePath);
            }
            else if (file.endsWith('.txt')) {
                const document = await documents_model_1.Document.findOne({
                    where: { chemin: filePath },
                });
                if (!document) {
                    const fileText = await fs_1.promises.readFile(filePath, 'utf8');
                    const filteredText = await this.filterText(fileText);
                    const lemmatizedText = await this.lemmatizeText(filteredText);
                    const occurrences = this.countOccurs(lemmatizedText);
                    await this.storeDataInDatabase(file, filePath, lemmatizedText, fileText, occurrences);
                }
            }
        }
    }
    async storeDataInDatabase(fileName, filePath, lemmatizedText, text, occurrences) {
        try {
            const [document, createdDocument] = await documents_model_1.Document.upsert({
                titre: fileName,
                contenu: lemmatizedText.join(' '),
                contenu_lemmatisee: text,
                chemin: filePath,
            });
            if (createdDocument) {
                for (const [word, count] of Object.entries(occurrences)) {
                    const [mot, createdMot] = await mots_model_1.Mot.upsert({ mot: word });
                    await occurences_model_1.Occurrence.upsert({
                        id_mot: mot.id,
                        id_document: document.id,
                        occurrence: count,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error storing data in the database:', error);
            throw error;
        }
    }
};
exports.TextProcessingService = TextProcessingService;
exports.TextProcessingService = TextProcessingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], TextProcessingService);
//# sourceMappingURL=text-processing.service.js.map