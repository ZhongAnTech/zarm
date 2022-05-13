import type { Images } from '../interface';

const showOriginButton = (images: Images, index?: number): boolean => {
  if (images && typeof index === 'number' && images[index] && images[index].originSrc) {
    return true;
  }
  return false;
};

export default showOriginButton;
