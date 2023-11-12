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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProcessingController = void 0;
const common_1 = require("@nestjs/common");
const text_processing_service_1 = require("./text-processing.service");
let TextProcessingController = class TextProcessingController {
    constructor(textProcessingService) {
        this.textProcessingService = textProcessingService;
    }
    async processTxt() {
        const text = await this.textProcessingService.fetchText();
        const filtredText = await this.textProcessingService.filterText(text);
        const lemmatizedText = await this.textProcessingService.lemmatizeText(filtredText);
        let text1;
        lemmatizedText.forEach((element) => {
            text1 = text1 + ' ' + element;
        });
        const countOccurs = await this.textProcessingService.countOccurs(lemmatizedText);
        return countOccurs;
    }
    async viewresukt() {
        const text = await this.textProcessingService.fetchText();
        const filteredText = await this.textProcessingService.filterText(text);
        const lemmatizedText = await this.textProcessingService.lemmatizeText(filteredText);
        const countOccurs = await this.textProcessingService.countOccurs(lemmatizedText);
        const words = Object.entries(countOccurs).map(([word, count]) => ({
            word,
            count,
        }));
        return { words };
    }
};
exports.TextProcessingController = TextProcessingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TextProcessingController.prototype, "processTxt", null);
__decorate([
    (0, common_1.Get)('/view'),
    (0, common_1.Render)('results'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TextProcessingController.prototype, "viewresukt", null);
exports.TextProcessingController = TextProcessingController = __decorate([
    (0, common_1.Controller)('text-processing'),
    __metadata("design:paramtypes", [text_processing_service_1.TextProcessingService])
], TextProcessingController);
//# sourceMappingURL=text-processing.controller.js.map