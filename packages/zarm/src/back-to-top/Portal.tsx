import { useEffect, useState } from 'react';

export const getId = () => {
  return Math.random().toString(32).slice(2, 10);
};

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  el.className = `za-${id}-container`;
  return el;
};

export const usePortal = (
  selectId: string = getId(),
  getContainer?: () => HTMLElement | null,
): HTMLElement | null => {
  const id = `za-${selectId}`;
  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(createElement(id));

  useEffect(() => {
    const customContainer = getContainer ? getContainer() : null;
    const parentElement = customContainer || document.body;
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }
    setElSnapshot(el);
  }, []);

  return elSnapshot;
};

export default usePortal;
