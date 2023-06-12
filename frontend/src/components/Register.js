import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios';
import logo from '../assets/auc-hammer.png';


const Register = (props) => {
    const navigate =  useNavigate();
    
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [confrimPassword, setConfirmPassword] = useState('');

    const onChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value });
    }
    const confrimPasswordChanged = (event) => {
        setConfirmPassword(event.target.value);
    }

    const validateForm = () => {

        if(user.firstName === ''){
            setError("First name cannot be empty");
            return false;
        }

        if(user.lastName === ''){
            setError("Last name cannot be empty");
            return false;
        }

        if(user.password === ''){
            setError("Password cannot be empty");
            return false;
        }

        if( confrimPassword !== user.password){
            setError("Passwords do not match");
            return false;
        }
        
        return true;
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('hi')
        if(validateForm()) {
            axios
                .post('http://localhost:8082/api/users', user)
                .then( result => {
                    setUser({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                    });
                    setError('');
                    navigate('/login');
                })
                .catch( error => {
                    if(error.response && error.response.status === 400) {
                        setError(error.response.data.error);
                    } else {
                        setError('Something went wrong. Please try again later.');
                    }
                    console.log('error');
                })
        }
    }

    return(
        <>
            <div className="row align-items-center" style={{height: '100vh'}}>
                <div className="mx-auto col-10 col-md-8 col-lg-4">
                    <img src={logo} className="rounded mx-auto d-block" alt='an auction hammer' style={{width:'30%'}}></img>
                    <h1 className="text-center mb-4">Register</h1>
                    <div style={{textAlign:'center'}} className='text-danger'>{error && <p>{error}</p>}</div>
                    <form onSubmit={onSubmit}>
                        <div className="row mb-4">
                            <div className="col">
                                <input type='text' id='register-fname' className='form-control' placeholder='First name' name='firstName' value={user.firstName} onChange={onChange}/>
                            </div>
                            <div className="col">
                                <input type='text' id='register-lname' className='form-control' placeholder='Last name' name='lastName' value={user.lastName} onChange={onChange}/>
                            </div>
                        </div>
                        <div className='form-outline mb-4'>
                            <input type='email' id='register-email' className='form-control' placeholder='Email address' name='email' value={user.email} onChange={onChange}/>
                        </div>
                        <div className='form-outline mb-4'>
                            <input type='password' id='register-password' className='form-control' placeholder='Password' name='password' value={user.password} onChange={onChange}/>
                        </div>
                        <div className='form-outline mb-4'>
                            <input type='password' id='register-confirm-password' className='form-control' placeholder='Confirm password' onChange={confrimPasswordChanged}/>
                        </div>
                        <p style={{textAlign:'center'}}>Already a member? <Link to="/login">Login</Link></p>
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;