import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/segmented-control/demo.md'),
      className: 'segmented-control-page',
    };
  }
}
