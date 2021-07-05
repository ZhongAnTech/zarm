import { isObject, isString } from '../../utils/validate';
import type { Images, ImageObject } from '../interface';
import LOAD_STATUS from './loadStatus';

function isImageString(image: ImageObject | string): image is string {
  return isString(image);
}
function isImageObject(image: ImageObject | string): image is ImageObject {
  return isObject(image);
}

const formatImages = (images: ReadonlyArray<ImageObject | string>): Images => {
  const previewImages: Images = [];
  (images || []).forEach((image: ImageObject | string) => {
    if (isImageString(image)) {
      previewImages.push({
        src: image,
      });
    } else if (isImageObject(image)) {
      previewImages.push({
        src: image.src,
        originSrc: image.originSrc,
        loaded: LOAD_STATUS.before,
      });
    }
  });
  return previewImages;
};

export default formatImages;
