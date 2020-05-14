const getMountNode = (props: any): HTMLElement => {
  if (props) {
    const { getContainer } = props;
    if (getContainer) {
      if (typeof getContainer === 'function') {
        return getContainer();
      }
      if (
        typeof getContainer === 'object'
        && getContainer instanceof HTMLElement
      ) {
        return getContainer;
      }
    }
    return document.body;
  }
  return document.body;
};

export default getMountNode;
