/**
 * change img size or quality todo change size
 *
 * @param img
 * @param quality
 * @param fileType
 * @returns {string}
 */
export default function changeImageSize(img, quality, fileType) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // const MAX_WIDTH = 800;
  // const MAX_HEIGHT = 600;
  const width = img.width;
  const height = img.height;

  // if (width > height) {
  //   if (width > MAX_WIDTH) {
  //     height *= MAX_WIDTH / width;
  //     width = MAX_WIDTH;
  //   }
  // } else if (height > MAX_HEIGHT) {
  //   width *= MAX_HEIGHT / height;
  //   height = MAX_HEIGHT;
  // }

  canvas.width = width;
  canvas.height = height;

  // 在canvas绘制前填充白色背景
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0, width, height);

  // 是否有效的压缩比例（0 - 1）
  if (!(quality > 0 && quality <= 1)) {
    console.error('请输入有效的压缩比例, 没有将默认使用 0.92');
  }

  return canvas.toDataURL(fileType, quality);
}
