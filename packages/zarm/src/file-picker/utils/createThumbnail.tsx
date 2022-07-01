import changeImageSize from './changeImageSize';

export interface IFileProps {
  file: File;
  quality?: number;
  fileType: string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

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
export default function createThumbnail({
  file,
  quality,
  fileType,
  maxWidth,
  maxHeight,
}: IFileProps) {
  return new Promise<string>((resolve) => {
    const img = document.createElement('img');

    window.URL = window.URL || window.webkitURL;

    img.onload = () => {
      let imgUrl: string;

      if (quality || maxWidth || maxHeight) {
        imgUrl = changeImageSize(img, quality, fileType);
      } else {
        imgUrl = img.src;
      }

      resolve(imgUrl || '');
    };

    img.src = window.URL.createObjectURL(file);
  });
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
