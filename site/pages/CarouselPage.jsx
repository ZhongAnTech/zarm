import Markdown from '../components/Markdown';
import '../styles/pages/CarouselPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/carousel/demo.md'),
      className: 'carousel-page',
    };
  }
}
