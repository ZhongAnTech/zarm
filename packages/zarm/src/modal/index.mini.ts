import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import { alert } from './Alert.mini';
import { confirm } from './Confirm.mini';
import { clear, show } from './methods.mini';
import Modal from './Modal.mini';

export type { ModalAlertProps } from './Alert.mini';
export type { ModalConfirmProps } from './Confirm.mini';
export type { ModalShowProps } from './methods';
export type { ModalProps } from './Modal.mini';
export type { ModalCssVars } from './interface';

export default attachPropertiesToComponent(Modal, {
  show,
  clear,
  alert,
  confirm,
});