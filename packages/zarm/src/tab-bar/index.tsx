import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import ConfigReceiver from '../config-receiver';

TabBar.Item = TabBarItem;

export default ConfigReceiver()(TabBar);
