import Modal from './Modal';
import alert from './Alert';
import confirm from './Confirm';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { ModalProps, ModalCssVars } from './Modal';

export default attachPropertiesToComponent(Modal, {
  alert,
  confirm,
});
