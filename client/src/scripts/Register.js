import {useState} from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './LogIn';
export default function UserRegister(){

    const [info,setInfo] = useState({
        firstName:"",
        lastName:"",
        dateOfBirth: Date,
        phone:"",
        address:"",
        email:"",
        password:"",
        cPassword:"",
        image:File,
    });

    return(
        <div className='register-form'>
            
            <form className='the-form' onSubmit={(event)=>{
                event.preventDefault();
            }}>
                <h1>Register As User</h1><br/>
                <br />

                <label>First Name</label>
                <input type="text" required value={info.firstName}  onChange={(event) =>
                    {
                        setInfo({...info,firstName:event.target.value});
                    }
                }/>

                <label>Last Name</label>
                <input type="text" required value={info.lastName}  onChange={(event) =>
                    {
                        setInfo({...info,lastName:event.target.value});
                    }
                }/>

                <label>Date Of Birth</label>
                <input type="date" required onChange={(event) =>
                    {
                        setInfo({...info,dateOfBirth:event.target.value});
                    }
                }/>

                <label>Phone</label>
                <input type="text" required value={info.phone}  onChange={(event) =>
                    {
                        setInfo({...info,phone:event.target.value});
                    }
                }/>

                <label>Address</label>
                <input type="text" required value={info.address}  onChange={(event) =>
                    {
                        setInfo({...info, address:event.target.value});
                    }
                }/>

                <label>Email</label>
                <input type="text" required value={info.email}  onChange={(event) =>
                    {
                        setInfo({...info, email:event.target.value});
                    }
                }/>

                <label>Password</label>
                <input type="password" required value={info.password}  onChange={(event) =>
                    {
                        setInfo({...info, password:event.target.value});
                    }
                }/>

                <label>Confirm Password</label>
                <input type="password" required value={info.cPassword}  onChange={(event) =>
                    {
                        setInfo({...info, cPassword:event.target.value});
                    }
                }/>

                <label>Photo</label>
                <input type="file" required className='photo'  accept='image/*' onChange={(event) =>
                    {
                        setInfo({...info,image :event.target.files[0]});
                    }
                }/>

                <button className='register-button'>Register</button>

                <label className='log-in-question'>Already Have An Account?</label>
                
                <button className='log-in-button'><Link to='/Login' id='log-in-link'>Log-in</Link></button>
                </form>
            </div>
                
    );
}