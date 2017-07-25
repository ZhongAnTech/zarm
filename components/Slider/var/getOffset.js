export default function getOffset(dom) {
  if (!dom) {
    return null;
  }
  const offsetLeft = [];
  function loop(elem) {
    offsetLeft.push({
      left: elem.offsetLeft,
      top: elem.offsetTop,
    });
    if (elem.offsetParent) {
      loop(elem.offsetParent);
    }
  }
  loop(dom);
  return offsetLeft.reduce((prev, value) => {
    prev.left += value.left;
    prev.top += value.top;
    return prev;
  }, { left: 0, top: 0 });
}
