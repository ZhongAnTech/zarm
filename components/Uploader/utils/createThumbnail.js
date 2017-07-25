import changeImageSize from './changeImageSize';

/**
 * generate preview image
 * modify image quality
 *
 * @param file
 * @param quality
 * @param fileType
 * @param maxWidth
 * @param maxHeight
 * @param callback
 */
export default function createThumbnail({ file, quality, fileType, maxWidth, maxHeight }, callback) {
  const img = document.createElement('img');

  window.URL = window.URL || window.webkitURL;
  img.src = window.URL.createObjectURL(file);

  img.onload = () => {
    let imgUrl;

    if (quality || maxWidth || maxHeight) {
      imgUrl = changeImageSize(img, quality, fileType);
    } else {
      imgUrl = img.src;
    }

    callback(imgUrl);
  };
}

// FileReader
// export default function createThumbnail({ file, quality, fileType, maxWidth, maxHeight }, callback) {
//   const img = document.createElement('img');
//   const reader = new FileReader();

//   reader.onload = (e) => {
//     img.src = e.target.result;

//     callback(img.src);
//   };

//   reader.readAsDataURL(file);
// }
