import type { IPreviewerProps } from 'dumi';
import React from 'react';
import CodePreviewer from './CodePreviewer';

export interface PreviewerProps extends IPreviewerProps {
  originDebug?: IPreviewerProps['debug'];
}

const Previewer: React.FC<PreviewerProps> = (props) => {
  return <CodePreviewer {...props} />;
};

export default Previewer;
