import ImagePreview from './ImagePreview';
import show from './show';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

attachPropertiesToComponent(ImagePreview, { show });

export type { ImagePreviewProps } from './ImagePreview';

export default ImagePreview;
