declare module 'react-dom/client' {
  import type { ReactElement } from 'react';

  interface Root {
    render(node: ReactElement): void;
    unmount(): void;
  }

  export function createRoot(container: Element | DocumentFragment): Root;
}
