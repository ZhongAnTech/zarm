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
  onChange?: (file: FileObject | FileObject[]) => void;
  onBeforeSelect?: () => boolean;
}
