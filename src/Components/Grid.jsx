import React from "react";
import GridItem from "./GridItem";
import "./CSS/grid.css";

function Grid(props) {
  var i = 0;
  var items = [];
  while (i < 9) {
    items.push(<GridItem key={i} index = {i}/>);
    i++;
  }
  return  (<div className = "grid-container">{items} </div>) ;
}

Grid.displayName = "Grid";
export default Grid;
