import Markdown from '../components/Markdown';
import '../styles/pages/ButtonPage';

export default class ButtonPage extends Markdown {
  document = () => {
    return {
      document: require('../../components/button/button.md'),
      className: 'button-page',
    };
  }
}
