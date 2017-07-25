/**
 * Created by lvs on 2017/5/12.
 */
export default function camelCase(str) {
  return (String(str)).replace(/-[\w]/g, (key, index) => {
    return index ? (key[1] || '').toUpperCase() : key[1];
  });
}
