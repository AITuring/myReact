import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement(
    'div',
    {
        title: 'react div',
    },
    'Hello, React!'
);

console.log(element);

ReactDOM.render(element, document.getElementById('app'));