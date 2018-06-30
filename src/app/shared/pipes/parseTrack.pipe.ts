import { Pipe, PipeTransform } from '@angular/core';
import { MediaParserService } from '@core/services/index';


@Pipe ({ name: 'parseTracks' })
export class ParseTracksPipe implements PipeTransform {
  constructor (private mediaParserService: MediaParserService) {
  }//e constructor


  transform (value: any): any {
    return this.mediaParserService.parseTracks (value);
  }//e transform
}
//e class
