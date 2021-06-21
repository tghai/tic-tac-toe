import React, { useState } from "react";
import "./CSS/gridItem.css";
import Zero from "./Zero";
import Cross from "./Cross";

function GridItem(props) {
 
  return (
    <div data-index= {props.index} className="grid-item" >
      {props.state ? <Cross /> : null}
    </div>
  );
}

GridItem.displayName = "GridItem";
export default GridItem;
