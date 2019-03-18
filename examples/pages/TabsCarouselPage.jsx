import Markdown from '../components/Markdown';
import '../styles/pages/TabsCarouselPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/tabs-carousel/demo.md'),
      className: 'tabs-carousel-page',
    };
  }
}
