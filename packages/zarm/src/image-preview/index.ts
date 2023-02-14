import ImagePreview from './ImagePreview';
import showImagePreview from './show';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { ImagePreviewProps, ImagePreviewCssVars } from './ImagePreview';
export default attachPropertiesToComponent(ImagePreview, { show: showImagePreview });
