import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/marquee/demo.md'),
      className: 'marquee-page',
    };
  }
}