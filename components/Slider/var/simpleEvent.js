/**
 * Created by lvs on 2017/5/12.
 */

function isEmptyObj(obj) {
  let x;
  for (x in obj) {
    return false;
  }
  return true;
}

/**
 * 一个简单的事件处理工具
 * 正常情况下我们需要监听dom事件会使用 elem.addEventListener("event",fn);
 * 使用 Event.add(elem,"click",function (){ console.log(e)}); 添加事件 支持命名空间
 * s
 * 用 Event.remove(elem,"click"); 删除事件句柄
 * 如果没有传递 "click";例如 Event.remove(elem); 则会删除用此程序绑定在elem上的所以事件
 * 允许你在删除事件的时候使用空格进行多命名空间删除
 */

function deleteAndRemove(data, type, elem) {
  delete data[type];
  elem.removeEventListener(type, simpleEvent.handler);
}

const simpleEvent = {
  handler(e) {
    simpleEvent.dispatch.call(this, e);
  },
    /**
     *
     * @param elem 要绑定的dom元素 必须支持 elem.addEventListener
     * @param type 绑定事件类型 比如click mouseover
     * @param fn 事件的回调函数
     * @returns 返回对象本身 支持链式调用
     */

  add(elem, types, fn) {
    if (!elem || typeof elem.addEventListener !== 'function' || (typeof fn !== 'function') || (typeof types !== 'string')) {
      return simpleEvent;
    }

        // 获取缓存
    let event_data;
    if (!(event_data = elem.__event_data)) {
      event_data = elem.__event_data = {};
      event_data.__handler = simpleEvent.handler;
    }

        // 拆分多个绑定事件
    const types_arr = types.match(/\S+/g) || [];
    types_arr.forEach((type_elem) => {
      let type;                      // 当前事件类型
      let type_data;                 // 当前事件缓存
      const namespace = type_elem;     // 获取命名空间
      type = type_elem.split('.')[0];

            // 添加监听事件
      if (!(type_data = event_data[type])) {
        type_data = event_data[type] = [];
        elem.addEventListener(type, simpleEvent.handler);
      }

            // 缓存事件队列
      type_data.push({
        namespace,
        callback: fn,
        type,
      });
    });
    return simpleEvent;
  },

    /**
     * 内部方法
     * @param e
     * @returns 返回simpleEvent本身
     */
  dispatch(e) {
    const elem = this;
    if (!elem.__event_data) {
      return simpleEvent;
    }
    const type = e.type;
    const event_data = elem.__event_data[type];
    if (event_data) {
      event_data.forEach((data) => {
        data.callback.call(elem, e);
      });
    }
    return simpleEvent;
  },

    /**
     *
     * @param elem 删除事件的dom
     * @param type 删除事件的类型
     * @param namespace  删除事件的回调函数的命名空间
     * @returns simpleEvent
     */
  remove(elem, types) {
    if (!elem || (typeof elem.removeEventListener) !== 'function') {
      return simpleEvent;
    }
    let data;   // 数据
    if (!(data = elem.__event_data)) {
      return simpleEvent;
    }

        // 没有type表示删除所有绑定的事件
    if (!types) {
      Object.keys(data).forEach((key, i) => {
        elem.removeEventListener(key, simpleEvent.handler);
      });
      delete elem.__event_data;
      return simpleEvent;
    }

    const types_arr = types.match(/\S+/g) || [];

    types_arr.forEach((type_data) => {
      const namespace = type_data;
      const type = type_data.split('.')[0];
            // 若没有命名空间 直接删除全部
      if (type === namespace) {
        deleteAndRemove(data, type, elem);
      } else {
                // 获取每个事件的缓存
        const event_data = data[type];
        if (event_data) {
          const lens = event_data.length;
          let i = lens;

          while (i--) {
            const event_data_elem = event_data[i];
            if (event_data_elem.namespace === namespace) {
              event_data.splice(i, 1);
            } else {
              const ns_reg = new RegExp(`^${namespace}\\.`);
              if (ns_reg.test(event_data_elem.namespace)) {
                event_data.splice(i, 1);
              }
            }
          }
        }
                // 已经清空了
        if (event_data && event_data.length === 0) {
          deleteAndRemove(data, type, elem);
        }
      }
    });

    if (isEmptyObj(data)) {
      delete elem.__event_data;
    }
    return simpleEvent;
  },
};
export default simpleEvent;
