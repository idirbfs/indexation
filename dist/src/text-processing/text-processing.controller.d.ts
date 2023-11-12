import { TextProcessingService } from './text-processing.service';
export declare class TextProcessingController {
    private readonly textProcessingService;
    constructor(textProcessingService: TextProcessingService);
    processTxt(): Promise<{
        [key: string]: number;
    }>;
    viewresukt(): Promise<{
        words: {
            word: string;
            count: number;
        }[];
    }>;
}
