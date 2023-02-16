import React from 'react';
import  ReactDOM  from 'react-dom';
import './app.scss'

function App(props) {
  console.log(ReactDOM.version, '----->')
  return props.children;
}

export default App;
