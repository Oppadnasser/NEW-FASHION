import {useState} from 'react';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

export default function LogIn(){
    const [logInfo , setLogInfo] = useState(
        {
            email:'', password:''
        });

    return(
        <div className='Log-in-div'>
            <form className='log-in-form'>

                <h1>Log-In</h1>
                <br /><br />

                <label>Email</label>
                <input value={logInfo.email} type='text' onChange={(event)=>{
                    setLogInfo({...logInfo,email:event.target.value});
                }} />

                <label>Password</label>
                <input value={logInfo.password} type='password' onChange={(event)=>{
                    setLogInfo({...logInfo,password:event.target.value});
                }}/>

                <button className='log-in-login-page'><Link to='/main' id='to-main'>Log-In</Link></button>

                <label id='to-register-link'>Don't Have An Account?</label><br/>
                <button className='register-login-page'><Link to='/user-register' id='to-register-button'>Register</Link></button>

            </form>

        </div>
    )
}
