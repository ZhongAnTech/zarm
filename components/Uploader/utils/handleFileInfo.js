import getFileDetail from './getFileDetail';
import createThumbnail from './createThumbnail';

/**
 * handle single file and get file info
 *
 * @param file
 * @param quality
 * @param callback
 */
export default function handleFileInfo({ file, quality }, callback) {
  const {
    fileSize,
    fileType,
    isPic,
    fileName,
  } = getFileDetail(file);

  const fileDetail = {
    file,
    fileType,
    fileSize,
    fileName,
  };

  const callbackFunc = (url) => {
    fileDetail.thumbnail = url;

    callback(fileDetail);
  };

  if (isPic) {
    createThumbnail({
      file,
      quality,
      fileType,
    }, callbackFunc);
  } else {
    callback(fileDetail);
  }
}
