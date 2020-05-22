import React from "react";
import {HOME, REGISTER, SIGN_IN, SIGN_OUT} from "../constants";


const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (<nav className='flex justify-end'>
            <div className='ph3 mt4'>
                <p onClick={() => {
                    onRouteChange(SIGN_OUT)
                }} className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib black'>Sign Out</p>
            </div>
        </nav>);
    } else {
        return (<nav className='flex justify-end'>
            <div className='ph3 mt4'>
                <p onClick={() => onRouteChange(REGISTER)} className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib black'>Register</p>
                <p onClick={() => onRouteChange(SIGN_IN)} className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib black'>Sign In</p>
            </div>
        </nav>);
    }
};

export default Navigation;