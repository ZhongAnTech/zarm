import { Tabs } from 'antd';
import * as React from 'react';

interface CodeFile {
  value: string;
  label: string;
  lang?: string;
}

interface CodePreviewProps {
  files?: CodeFile[];
  codes?: Record<PropertyKey, string>;
  toReactComponent?: (node: any) => React.ReactNode;
  onCodeTypeChange?: (activeKey: string) => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({ files, toReactComponent, onCodeTypeChange }) => {
  return (
    <Tabs
      className="previewer-tabs"
      onChange={onCodeTypeChange}
      items={files.map((file) => ({
        key: file.label,
        label: file.label,
        children: (
          <div className="highlight">
            {toReactComponent(['pre', { lang: file.lang, highlighted: file.value }])}
          </div>
        ),
      }))}
    />
  );
};

export default CodePreview;
