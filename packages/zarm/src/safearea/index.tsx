import * as React from 'react';

const SafeAreaContext = React.createContext({ top: 0, left: 0, right: 0, bottom: 0 });
const { Provider: SafeAreaProvider, Consumer: SafeAreaConsumer } = SafeAreaContext;

export { SafeAreaProvider, SafeAreaConsumer };

export const SafeAreaView: React.FC = (props) => {
  const { children } = props;
  return <>{children}</>;
};

// 暴露 css variable
// document.body.style.setProperty('--primary', '#7F583F');
// document.body.style.getPropertyValue('--primary').trim();
