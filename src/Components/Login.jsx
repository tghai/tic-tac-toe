import React, { useRef } from 'react';

import './../CSS/login.css';

function Login(props) {
    const userRef = useRef(null);
    return (
        <div className="login">
        <input type="text" ref={userRef} placeholder="Enter your name" />
        <button type="button" onClick={()=> props.onClick(userRef.current.value)}>Login</button>
      </div>
    )
}
export default Login;