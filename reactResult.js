// import React from 'react';
// import ReactDOM from 'react-dom';
import myReact from "./myReact";

const element = myReact.createElement(
    'div',
    {
        title: 'react div',
        className: 'my-div',
        style: {
            color: 'red',
        }
    },
    'div part',
    myReact.createElement('a', {
        href: 'https://www.baidu.com',
        target: '_blank',
        style: {
            color: 'blue',
        }
    }, 'a part'),
);

console.log(element);

myReact.render(element, document.getElementById('app'));