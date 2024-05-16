import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ServerCommunication from './ServerCommunication';

const rootElement = document.querySelector('#root');

ReactDOM.render(<ServerCommunication />, rootElement);
