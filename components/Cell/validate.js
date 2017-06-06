function _isUndefined(res, func) {
  if (res === undefined) {
    return () => {
      return true;
    };
  }

  return func(res);
}

const min = (res) => {
  return _isUndefined(res, (theRes) => {
    theRes = Number(theRes);

    return (value) => {
      return value >= theRes;
    };
  });
};

const max = (res) => {
  return _isUndefined(res, (theRes) => {
    theRes = Number(theRes);

    return (value) => {
      return value <= theRes;
    };
  });
};

const minLength = (res) => {
  return _isUndefined(res, (theRes) => {
    theRes = Number(theRes);

    return (value) => {
      return value.length >= theRes;
    };
  });
};

const maxLength = (res) => {
  return _isUndefined(res, (theRes) => {
    theRes = Number(theRes);

    return (value) => {
      return value.length <= theRes;
    };
  });
};

const pattern = (res) => {
  return _isUndefined(res, (theRes) => {
    return (value) => {
      return theRes.test && theRes.test(value);
    };
  });
};

const required = (res) => {
  return _isUndefined(res, (theRes) => {
    return (value) => {
      if (!theRes) {
        return true;
      }

      return value !== undefined && value !== '';
    };
  });
};

const func = (res) => {
  return _isUndefined(res, (theRes) => {
    return (value) => {
      if (!theRes) {
        return true;
      }

      return !!theRes(value);
    };
  });
};

const errors = {
  min: ({ title = '', rule = '' } = {}) => `${title} - 不得小于${rule}`,
  max: ({ title = '', rule = '' } = {}) => `${title} - 不得大于${rule}`,
  minLength: ({ title = '', rule = '' } = {}) => `${title} - 长度不得小于${rule}`,
  maxLength: ({ title = '', rule = '' } = {}) => `${title} - 长度不得大于${rule}`,
  pattern: ({ title = '' } = {}) => `${title} - 不符合验证规则`,
  required: ({ title = '' } = {}) => `${title} - 此项必填`,
  func: ({ title = '' } = {}) => `${title} - 验证不通过`,
  default: ({ title = '', value = '' } = {}) => `${title} - ${(value === undefined || value === '') ? '请输入信息' : '已填写'}`,

  // 字段名 当前的值 验证结果 规则约束
  // func: ({ title, value, validate, rule }) => { return '' };
};

const getMsg = (error, opts) => {
  if (!error) {
    return '';
  }

  switch (typeof error) {
    case 'function': {
      return error(opts);
    }
    default: {
      return error;
    }
  }
};

export {
  min,
  max,
  minLength,
  maxLength,
  pattern,
  required,
  func,
  errors,
  getMsg,
};
