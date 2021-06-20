import React from 'react';
import ReactDOM  from 'react-dom';

const reactContainer = document.getElementById("react-dom-container");

function Index() {
    return (
        <>
        <h1>Tic-tac-toe</h1>
        <div id="ticTac"></div>
        </>
    )
}
const reactComponent = Index();
ReactDOM.render(reactComponent, reactContainer);