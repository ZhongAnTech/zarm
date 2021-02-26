/**
 * detect the file is image
 *
 * @param fileType
 */
export default function isImage(fileType: string): boolean {
  const imageType = /image.*/;

  return !!fileType.match(imageType);
}
