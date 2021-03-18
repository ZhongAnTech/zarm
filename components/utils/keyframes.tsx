const toKeyframe = (name: string, content: string) => `
  @-webkit-keyframes ${name} {
    ${content}
  }
  @keyframes ${name} {
    ${content}
  }
`;

export const removeKeyframe = (name: string) => {
  const keyframe = document.getElementById(name);
  !!keyframe && document.getElementsByTagName('head')[0].removeChild(keyframe!);
};

export const addKeyframe = (name: string, content: string) => {
  const style = document.createElement('style');
  style.id = name;
  style.type = 'text/css';
  style.innerHTML = toKeyframe(name, content);
  document.getElementsByTagName('head')[0].appendChild(style);
};

export const getKeyframe = (name: string) => {
  const keyframe = document.getElementById(name);
  return keyframe && keyframe.innerHTML;
};

export const existKeyframe = (name: string) => {
  const keyframe = document.getElementById(name);
  return !!keyframe;
};
