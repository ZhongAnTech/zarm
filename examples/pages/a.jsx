import Markdown from '../components/markdown';

export default class Button extends Markdown {
  document = () => {
    return require('../../docs/zh-cn/components/a.md');
  }
}
