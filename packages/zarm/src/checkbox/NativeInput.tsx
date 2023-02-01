import React, { FC, InputHTMLAttributes, useEffect, useRef } from 'react';

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'checkbox' | 'radio';
};

const NativeInput: FC<NativeInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const latestChecked = (e.target as HTMLInputElement).checked;
    if (latestChecked === props.checked) return;
    props.onChange(e);
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
      id={props.id}
      type={props.type}
      className={props.className}
      disabled={props.disabled}
      checked={props.checked}
      onChange={() => {}}
    />
  );
};

export default NativeInput;
