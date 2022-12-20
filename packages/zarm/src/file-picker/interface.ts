import * as React from 'react';

export interface FileObject {
  file: File;
  fileType: string;
  fileSize: number;
  fileName: string;
  thumbnail: string;
}

export interface BaseFilePickerProps {
  disabled?: boolean;
  multiple?: boolean;
  quality?: number;
  accept?: string;
  capture?: any;
  children?: React.ReactNode;
  onChange?: (file: FileObject | FileObject[]) => void;
  onBeforeSelect?: () => boolean;
}
