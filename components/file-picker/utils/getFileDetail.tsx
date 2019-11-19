import isImage from './isImage';

/**
 * get file detail
 *
 * @param file
 * @returns {{fileName, fileSize, fileType: string, isPic: boolean}}
 */
export default function getFileDetail(file: File) {
  const fileSize = file.size;

  const fileName = file.name;

  const fileType = file.type || fileName.substr(fileName.lastIndexOf('.') + 1);

  const isPic = isImage(fileType);

  return {
    fileName,
    fileSize,
    fileType,
    isPic,
  };
}
