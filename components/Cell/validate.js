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

export {
  min,
  max,
  minLength,
  maxLength,
  pattern,
  required,
  func,
};
