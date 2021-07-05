import ConfigReceiver from '../config-receiver';
import ImagePreview from './ImagePreview';

export type { ImagePreviewProps } from './ImagePreview';

export default ConfigReceiver('ImagePreview')(ImagePreview);
