import { createContext } from 'react';

interface DropdownContextState {
    value?: unknown;
    maskClosable: boolean;
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
