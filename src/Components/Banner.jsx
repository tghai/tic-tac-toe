import React from 'react';
import '../CSS/banner.css';

function Banner(props) {
return(
<div className="banner">{props.value}
</div>
)
}

Banner.displayName = 'Banner';
export default Banner;
