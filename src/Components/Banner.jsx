import React from 'react';
import '../CSS/banner.css';

function Banner(props) {
return(
<div className="banner">{props.value}
<button onClick={()=>{props.onClick()}}>Click to play again</button>
</div>
)
}

Banner.displayName = 'Banner';
export default Banner;
