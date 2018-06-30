import { Pipe, PipeTransform } from '@angular/core';


@Pipe ({ name: 'isInQueue' })
export class IsInQueuePipe implements PipeTransform {
  transform (media: GoogleApiYouTubeVideoResource, medias: string[]) {
    return medias.includes (media.id);
  }//e transform
}
//e class
