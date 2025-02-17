import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import ImagePreview from './ImagePreview';
import showImagePreview from './show';

export type { ImagePreviewCssVars, ImagePreviewProps } from './ImagePreview';
export default attachPropertiesToComponent(ImagePreview, { show: showImagePreview });
