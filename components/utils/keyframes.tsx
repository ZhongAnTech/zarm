
const toKeyframe = (name, content) => `
  @-webkit-keyframes ${name} {
    ${content}
  }
  @keyframes ${name} {
    ${content}
  }
`;

export const removeKeyframe = (name) => {
  const keyframe = document.getElementById(name);
  !!keyframe && document.getElementsByTagName('head')[0].removeChild(keyframe!);
};

export const addKeyframe = (name, content) => {
  const style = document.createElement('style');
  style.id = name;
  style.type = 'text/css';
  style.innerHTML = toKeyframe(name, content);
  document.getElementsByTagName('head')[0].appendChild(style);
};

export const getKeyframe = (name) => {
  const keyframe = document.getElementById(name);
  return keyframe && keyframe.innerHTML;
};

export const existKeyframe = (name) => {
  const keyframe = document.getElementById(name);
  return !!keyframe;
};
