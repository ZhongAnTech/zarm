import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/stepper/demo.md'),
      className: 'stepper-page',
    };
  }
}
