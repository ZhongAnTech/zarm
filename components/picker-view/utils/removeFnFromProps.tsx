import omit from 'lodash/omit';

const removeFnFromProps = (props, fnList) => {
  return omit(props, fnList);
};

export default removeFnFromProps;
