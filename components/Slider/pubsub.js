/**
 * Created by lvs on 2017/4/27.
 */
export default {
  _events: {},
  dispatch(event, data) {
    if (!this._events[event]) { // 没有事件
      return;
    }
    this._events[event].forEach((fn) => {
      fn(data);
    });
  },

  subscribe(event, callback) {
        // 创建一个新事件数组
    if (!this._events[event]) {
      this._events[event] = [];
    }
    if (typeof callback === 'function') {
      this._events[event].push(callback);
    }
  },
};
