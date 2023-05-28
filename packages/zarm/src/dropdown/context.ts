import { createContext } from 'react';
import { TransitionName } from '../transition/interface';

interface DropdownContextState {
    value?: unknown;
    maskClosable: boolean;
    maskOpacity?: number;
    animationType?: TransitionName;
    forceRender: boolean;
    destroy: boolean;
    onClose: () => void;
    afterClose: () => void;
}

export const DropdownContext = createContext<DropdownContextState>({
    value: undefined,
    maskClosable: false,
    forceRender: false,
    destroy: false,
    onClose: () => {},
    afterClose: () => {},
});
