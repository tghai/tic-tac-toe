import React from 'react';
import ReactDOM  from 'react-dom';
import Game from './Components/Game';

const reactContainer = document.getElementById("react-dom-container");

function Index() {
    return (<Game/>)
}
const reactComponent = Index();
ReactDOM.render(reactComponent, reactContainer);