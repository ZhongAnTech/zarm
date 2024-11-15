import { useEffect } from 'react';

/**
 * 自定义 Hook，用于在非生产环境下对废弃的 props 提示警告。
 * @param {string} componentName - 发生类型变更的组件名称。
 * @param {string} oldProp - 废弃的 prop 名称。
 * @param {string} newProp - 新的 prop 名称。
 */
export const useDeprecationWarning = (componentName, oldProp, newProp) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && oldProp !== undefined) {
      console.warn(
        `Warning: The prop "${oldProp}" is deprecated. ` +
          `you can use "${newProp}" instead.` +
          `\n\nPlease update the following components: ${componentName}`,
      );
    }
  }, [componentName, oldProp, newProp]);
};

/**
 * 自定义 Hook，用于在非生产环境下对类型变更的 props 提示警告。
 * @param {string} componentName - 发生类型变更的组件名称。
 * @param {string} propName - 发生类型变更的 prop 名称。
 * @param {string} propType - 传入的 prop 类型。
 * @param {string} expectedType - 预期的新类型（如 'object', 'number' 等）。
 */
export const useTypeChangeWarning = (componentName, propName, propType, expectedType) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (propType !== expectedType) {
        console.warn(
          `Warning: The prop "${propName}" is expected to be of type "${expectedType}", ` +
            `but received type "${propType}". ` +
            `\n\nPlease update the following components: ${componentName}`,
        );
      }
    }
  }, [componentName, propName, propType, expectedType]);
};
