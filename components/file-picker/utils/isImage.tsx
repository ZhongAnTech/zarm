/**
 * detect the file is image
 *
 * @param fileType
 * @returns {boolean}
 */
export default function isImage(fileType: string) {
  const imageType = /image.*/;

  return !!fileType.match(imageType);
}
