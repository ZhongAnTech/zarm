import type { Images } from '../PropsType';

const showOriginButton = (images: Images, index?: number): boolean => {
  if (images && typeof index === 'number' && images[index] && images[index].originUrl) {
    return true;
  }
  return false;
};

export default showOriginButton;
