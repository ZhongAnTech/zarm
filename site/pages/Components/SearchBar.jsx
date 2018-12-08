import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/search-bar/demo.md'),
      className: 'search-bar-page',
    };
  }
}
