
let EVENT_NAME_MAP = {
        'transition' : 'transitionend',
       'OTransition' : 'oTransitionEnd',
      'MsTransition' : 'MSTransitionEnd',
     'MozTransition' : 'mozTransitionEnd',
  'WebkitTransition' : 'webkitTransitionEnd',
};

let endEvents = [];
let testStyle = document.createElement('div').style;

if (!('TransitionEvent' in window)) {
  delete EVENT_NAME_MAP.transition;
}

for (let styleName in EVENT_NAME_MAP) {
  if (styleName in testStyle) {
    endEvents.push(EVENT_NAME_MAP[styleName]);
    break;
  }
}

export default function addEndEventListener(node, eventListener) {
  if (endEvents.length === 0) {
    window.setTimeout(eventListener, 0);
    return;
  }

  endEvents.forEach(event => {
    node.addEventListener(event, eventListener, false);
  });

  return {
    remove() {
      endEvents.forEach(event => {
        node.removeEventListener(event, eventListener, false);
      });
    }
  }
};