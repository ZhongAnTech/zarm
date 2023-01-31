import React, { FC, useEffect, useRef } from 'react';

export interface NativeInputProps {
  type?: 'checkbox' | 'radio';
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const NativeInput: FC<NativeInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.stopImmediatePropagation();

    const latestChecked = (e.target as HTMLInputElement).checked;
    if (latestChecked === props.checked) return;
    props.onChange(latestChecked);
  };

  useEffect(() => {
    if (props.disabled) return;
    if (!inputRef.current) return;

    const input = inputRef.current;
    input.addEventListener('click', handleClick);

    return () => {
      input.removeEventListener('click', handleClick);
    };
  }, [props.disabled, props.onChange]);

  return (
    <input
      ref={inputRef}
      id={props.id}
      type={props.type}
      className={props.className}
      disabled={props.disabled}
      defaultChecked={props.defaultChecked}
      checked={props.checked}
      onChange={() => {}}
    />
  );
};

export default NativeInput;
