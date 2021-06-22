import React from "react";
import GridItem from "./GridItem";
import "../CSS/grid.css";

function Grid(props) {
  return  (
  <div className="grid-container">
  {
  props.squares.map((square, index)=> {
  return  <GridItem key={index} value={square} onClick= {()=>{props.onClick(index)}}/>
  })
  }
  </div>
  ) ;
}

Grid.displayName = "Grid";
export default Grid;
