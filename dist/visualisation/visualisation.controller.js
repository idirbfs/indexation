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
exports.VisualisationController = void 0;
const common_1 = require("@nestjs/common");
let VisualisationController = class VisualisationController {
    showVisualisation() {
    }
    viewresukt() {
        return { message: 'Hello world!' };
    }
};
exports.VisualisationController = VisualisationController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('mainPage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VisualisationController.prototype, "showVisualisation", null);
__decorate([
    (0, common_1.Get)('/view'),
    (0, common_1.Render)('mainPage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VisualisationController.prototype, "viewresukt", null);
exports.VisualisationController = VisualisationController = __decorate([
    (0, common_1.Controller)('visualisation')
], VisualisationController);
//# sourceMappingURL=visualisation.controller.js.map