import { Controller, Get, Render } from '@nestjs/common';

@Controller('visualisation')
export class VisualisationController {
  @Get()
  @Render('mainPage')
  showVisualisation() {
    // return 'Visualisation';
  }

  @Get('/view')
  @Render('mainPage') // Use the name of your Handlebars template without the extension
  viewresukt() {
    return { message: 'Hello world!' };
  }
}
