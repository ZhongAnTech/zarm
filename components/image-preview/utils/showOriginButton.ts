import { Images } from '../PropsType';

const showOriginButton = (images: Images, activeIndex: number | undefined): boolean => {
  if (
    images &&
    typeof activeIndex === 'number' &&
    images[activeIndex] &&
    images[activeIndex].originUrl
    // && !images[activeIndex].loaded
  ) {
    return true;
  }
  return false;
};

export default showOriginButton;
