import { useRef } from 'react';
/**
 * 保存最新的值在ref中
 *
 * @template T
 * @param {T} value
 * @return {*}
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
