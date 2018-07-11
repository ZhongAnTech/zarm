import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/slider/demo.md'),
      className: 'slider-page',
    };
  }
}
