import React from "react";
import "../CSS/gridItem.css";
function GridItem(props) {
 
  return (
    <div className="grid-item" onClick = {props.onClick}>
      {props.value}
    </div>
  );
}

GridItem.displayName = "GridItem";
export default GridItem;
