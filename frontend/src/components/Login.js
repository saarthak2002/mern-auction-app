import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/auc-hammer.png';

const Login = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email:'',
        password:''
    });

    const [error, setError] = useState('');

    const onChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const validateForm = () => {

        if(user.email === ''){
            setError("Email cannot be empty");
            return false;
        }
        if(user.password === ''){
            setError("Password cannot be empty");
            return false;
        }

        return true;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if(validateForm()) {
            axios
            .post('http://localhost:8082/api/users/login', user)
            .then(result => {
                setUser({
                    email:'',
                    password:'',
                })
                setError('');
                localStorage.setItem('user', JSON.stringify(result.data.user));
                navigate('/');
            })
            .catch(error => {
                if(error.response && error.response.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError('Something went wrong. Please try again later.');
                }
                console.log('error');
            });
        }
    }

    return(
        <>
            <div className="row align-items-center" style={{height: '100vh'}}>
                <div className="mx-auto col-10 col-md-8 col-lg-4">
                    <img src={logo} className="rounded mx-auto d-block" alt='an auction hammer' style={{width:'30%'}}></img>
                    <h1 className="text-center mb-4">Login</h1>
                    <div style={{textAlign:'center'}} className='text-danger'>{error && <p>{error}</p>}</div>
                    <form onSubmit={handleLogin}>
                        <div className='form-outline mb-4'>
                            <input type='email' id='login-email' className='form-control' placeholder='Email address' name='email' value={user.email} onChange={onChange}/>
                        </div>
                        <div className='form-outline mb-4'>
                            <input type='password' id='login-password' className='form-control' placeholder='Password' name='password' value={user.password} onChange={onChange}/>
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                New here? <Link to="/register">Register</Link>
                            </div>
                            <div className="col">
                                <Link to="/" className='float-right'>Forgot password?</Link>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;