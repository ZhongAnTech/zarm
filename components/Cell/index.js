
import Cell from './Cell';
import Form from './CellForm';
import Validate, { getResult } from './CellValidate';

Cell.Form = Form;
Cell.Validate = Validate;
Cell.getResult = getResult;

export default Cell;
