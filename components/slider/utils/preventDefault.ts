import type { MouseEvent } from 'react';

export default function preventDefault(event: MouseEvent) {
  event.preventDefault();
}
