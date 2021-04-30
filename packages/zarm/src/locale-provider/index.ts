import ConfigProvider from '../config-provider';
import warnIfDeprecated from '../utils/warnIfDeprecated';

@warnIfDeprecated([{ oldComponent: 'LocaleProvider', newComponent: 'ConfigProvider' }])
export default class LocaleProvider extends ConfigProvider {}
