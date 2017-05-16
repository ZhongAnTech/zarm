import setStyle from './setStyle';

function fadeOut(dom, duration) {
  setStyle(dom, {
    transition: `opacity ${duration}s`,
  });
  const a = dom.clientHeight;
  setStyle(dom, {
    opacity: 0,
  });
  if (dom.__s_timer) {
    clearTimeout(dom.__s_timer);
  }
  dom.__s_timer = setTimeout(() => {
    dom.show = false;
    delete dom.__s_timer;
    setStyle(dom, {
      display: 'none',
      opacity: 1,
    });
  }, duration * 1000 + 10);
}

export default function noteAni(dom, time = 2000, duration = 300) {
  if (!dom) {
    return;
  }
  duration /= 1000;
  setStyle(dom, {
    display: 'block',
    opacity: 1,
    transition: `opacity ${0.1}s`,
  });
  dom.__show = true;
  if (dom.__fadeout_timer) {
    clearTimeout(dom.__fadeout_timer);
  }
  dom.__fadeout_timer = setTimeout(() => {
    fadeOut(dom, duration);
    delete dom.__fadeout_timer;
  }, time);
    // 更新到显示状态
}
