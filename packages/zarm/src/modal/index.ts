import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import { alert } from './Alert';
import { confirm } from './Confirm';
import { clear, show } from './methods';
import Modal from './Modal';

export type { ModalAlertProps } from './Alert';
export type { ModalConfirmProps } from './Confirm';
export type { ModalShowProps } from './methods';
export type { ModalCssVars, ModalProps } from './Modal';

export default attachPropertiesToComponent(Modal, {
  show,
  clear,
  alert,
  confirm,
});
