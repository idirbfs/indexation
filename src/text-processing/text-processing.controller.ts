import { Controller, Get, Render } from '@nestjs/common';
import { TextProcessingService } from './text-processing.service';

@Controller('text-processing')
export class TextProcessingController {
  constructor(private readonly textProcessingService: TextProcessingService) {}

  @Get()
  async processTxt() {
    const text = await this.textProcessingService.fetchText();

    const filtredText = await this.textProcessingService.filterText(text);

    const lemmatizedText = await this.textProcessingService.lemmatizeText(
      filtredText,
    );
    let text1: string;
    lemmatizedText.forEach((element) => {
      text1 = text1 + ' ' + element;
    });

    // return text1;

    const countOccurs = await this.textProcessingService.countOccurs(
      lemmatizedText,
    );

    return countOccurs;
  }

  @Get('/view')
  @Render('results') // Use the name of your Handlebars template without the extension
  async viewresukt() {
    const text = await this.textProcessingService.fetchText();
    const filteredText = await this.textProcessingService.filterText(text);
    const lemmatizedText = await this.textProcessingService.lemmatizeText(
      filteredText,
    );
    const countOccurs = await this.textProcessingService.countOccurs(
      lemmatizedText,
    );

    const words = Object.entries(countOccurs).map(([word, count]) => ({
      word,
      count,
    }));

    return { words };
  }
}
