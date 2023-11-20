import { TextProcessingService } from './text-processing.service';
export declare class TextProcessingController {
    private readonly textProcessingService;
    constructor(textProcessingService: TextProcessingService);
    processTxt(): Promise<string>;
}
