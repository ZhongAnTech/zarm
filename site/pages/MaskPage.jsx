import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/mask/demo.md'),
      className: 'mask-page',
    };
  }
}
