export function getSnippet (media) {
  return media && media.hasOwnProperty ('snippet') && media.snippet;
}
//e function


export function extractThumbnail (snippet) {
  let thumbUrl = '';
  if (snippet) {
    const thumbs = snippet.thumbnails;
    const sizes  = ['high', 'standard', 'default'];
    const thumb  = sizes.reduce ( (acc, size) => {
      acc.result = !acc.result.length && thumbs[size] ? thumbs[size].url : acc.result;
      return acc;
    }, { result: '' } );

    thumbUrl     = thumb.result;
  }
  return thumbUrl;
}
//e function


export function extractThumbUrl (media) {
  return extractThumbnail (getSnippet (media));
}
//e function
