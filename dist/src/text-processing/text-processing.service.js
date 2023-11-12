"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProcessingService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
const stop_words_constant_1 = require("../constants/stop-words.constant");
const fastCsv = require("fast-csv");
let TextProcessingService = class TextProcessingService {
    async fetchText() {
        const filePath = path.resolve(__dirname, '../../../text/text.txt');
        const text = await fs_1.promises.readFile(filePath, 'utf8');
        return text;
    }
    async filterText(text) {
        text = text.replace(/[^a-zA-ZÀ-ÿ-\s]/g, ' ');
        let transformedText = text.split(/\s+/);
        console.log(transformedText);
        transformedText = transformedText.map((word) => word.toLowerCase());
        transformedText = transformedText.map((word) => word.trim());
        transformedText = transformedText.filter((word) => word.length > 2);
        transformedText = transformedText.filter((element) => !stop_words_constant_1.STOP_WORDS.includes(element));
        return transformedText;
    }
    lemmatizeText(text) {
        const filePath = path.resolve(__dirname, '../../../src/assets/lemmas.csv');
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
};
exports.TextProcessingService = TextProcessingService;
exports.TextProcessingService = TextProcessingService = __decorate([
    (0, common_1.Injectable)()
], TextProcessingService);
//# sourceMappingURL=text-processing.service.js.map