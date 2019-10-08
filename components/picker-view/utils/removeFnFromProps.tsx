import _ from 'lodash';

const removeFnFromProps = (props, fnList) => {
  return _.omit(props, fnList);
};

export default removeFnFromProps;
