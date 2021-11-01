export default interface PropsType {
  value: Array<object>;
  initialKey: string; // default: initialKey  首字母字段对应的key
  key?: string; // default:
  ItemComponent: React.FC<any>;
}
