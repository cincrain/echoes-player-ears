import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component ({
  selector: 'image-blur',
  template: `
  <div class="media-bg"
    [ngStyle]="{ 'background-image': 'url(' + style + ')' }" >
  </div>
  `,
  styleUrls: ['./image-blur.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBlurComponent {
  @Input  () media: GoogleApiYouTubeVideoResource;

  get style () {
    const hasMedia = this.media && this.media.snippet;
    return hasMedia
      ? `${this.extractBestImage (hasMedia.thumbnails as any)}`
      : '';
  }//e style

  constructor () {
  }//e constructor


  extractBestImage (thumbnails: GoogleApiYouTubeThumbnailResource) {
    const quality =
      thumbnails && thumbnails.hasOwnProperty ('high') ? 'high' : 'default';
    const hasContent = thumbnails && quality && thumbnails[quality];
    return hasContent ? thumbnails[quality].url : '';
  }//e extractBestImage

}
//e class
