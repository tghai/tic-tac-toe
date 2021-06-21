import React from 'react';
import ReactDOM  from 'react-dom';

import Grid from './Components/Grid';

const reactContainer = document.getElementById("react-dom-container");

function Index() {
    return (
        <>
        <h1>Tic-Tac-Toe</h1>
        <Grid/>
        </>
    )
}
const reactComponent = Index();
ReactDOM.render(reactComponent, reactContainer);