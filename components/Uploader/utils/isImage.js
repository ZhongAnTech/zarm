/**
 * detect the file is image
 *
 * @param fileType
 * @returns {boolean}
 */
export default function isImage(fileType) {
  const imageType = /image.*/;

  return !!fileType.match(imageType);
}
