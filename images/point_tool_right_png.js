/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
