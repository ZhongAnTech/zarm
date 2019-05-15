import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import Demo from './Demo';
import Container from './Container';
import Footer from './Footer';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.components = new Map();
    this.nodeList = [];
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  componentWillUnmount() {
    this.nodeList.forEach((node) => {
      ReactDOM.unmountComponentAtNode(node);
    });
  }

  renderDOM() {
    // eslint-disable-next-line
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      this.nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
  }

  render() {
    const { document, className } = this.props;

    if (typeof document === 'string') {
      this.components.clear();
      const html = marked(
        document
          .replace(/## API\s?([^]+)/g, '')
          .replace(/##\s?([^]+?)((?=##)|$)/g, (match, p1) => {
            const id = parseInt(Math.random() * 1e9, 10).toString(36);
            this.components.set(id, React.createElement(Demo, this.props, p1));
            return `<div id=${id}></div>`;
          }),
        {
          renderer: new marked.Renderer(),
        },
      );

      return (
        <Container className={className}>
          <main dangerouslySetInnerHTML={{ __html: html }} />
          <Footer />
        </Container>
      );
    }

    return <span />;
  }
}
