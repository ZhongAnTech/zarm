import React, { useRef, useImperativeHandle } from 'react';
import { InputBaseProps, InputNumberProps, InputTextareaProps } from './PropsType';
import InputNumber from './InputNumber';
import InputBase from './InputBase';
import InputTextarea from './InputTextarea';
import { combineRef } from './utils';
// import { combineRef } from './utils';

export type InputProps = InputBaseProps | InputNumberProps | InputTextareaProps;

const Input = React.forwardRef((props, ref) => {
  const { type, ...rest } = props as InputProps;
  const { name } = rest;
  const inputNumberRef = useRef<InputNumber>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputNumberRef.current?.focus(),
    blur: () => inputNumberRef.current?.blur(),
    name,
  }));

  if (type === 'text' && 'rows' in props) {
    return <InputTextarea inputRef={ref} {...(rest as InputTextareaProps)} />;
  }
  switch (type) {
    case 'idcard':
    case 'price':
    case 'number':
      return (
        <InputNumber
          inputRef={ref}
          ref={combineRef(inputNumberRef)}
          {...(props as InputNumberProps)}
        />
      );

    case 'text':
    case 'search':
    case 'password':
    default:
      return <InputBase inputRef={ref} {...(props as InputBaseProps)} />;
  }
});

export default Input;

// export default class Input extends PureComponent<InputProps, {}> {
//   static defaultProps = {
//     type: 'text',
//   };

//   private input;

//   focus() {
//     if (this.input) {
//       this.input.focus();
//     }
//   }

//   blur() {
//     if (this.input) {
//       this.input.blur();
//     }
//   }

//   render() {
//     const { type, ...rest } = this.props;

//     if (type === 'text' && 'rows' in this.props) {
//       return (
//         <InputTextarea
//           ref={(ele) => {
//             this.input = ele;
//           }}
//           {...(rest as InputTextareaProps)}
//         />
//       );
//     }

//     switch (type) {
//       case 'idcard':
//       case 'price':
//       case 'number':
//         return (
//           <InputNumber
//             ref={(ele) => {
//               this.input = ele;
//             }}
//             {...(this.props as InputNumberProps)}
//           />
//         );

//       case 'text':
//       case 'search':
//       case 'password':
//       default:
//         return (
//           <InputBase
//             ref={(ele) => {
//               this.input = ele;
//             }}
//             {...(this.props as InputBaseProps)}
//           />
//         );
//     }
//   }
// }
