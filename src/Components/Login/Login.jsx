import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import {Link} from 'react-router-dom'
import { auth } from '../../Layout/Firebase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const emailRef = useRef();

const handleLogin = e => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);
    // reset
    setError(false)
    setSuccess(false)

    // login with firebase

    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
        console.log(result);

        if(!result.user.emailVerified){
            setError('Please Verifi your email first');

        } else{
            setSuccess(true);
        }

        
    })

    .catch(err  => setError('Error: ' + err.message));


}

const handleForgetPassword = () => {

    const email = emailRef.current.value;
    if(!email){
        console.log('please provide a valid email');
    }else{
        sendPasswordResetEmail(auth, email)
        .then( () => {

            alert('password reset email sent successfully')

        })

        .catch(err => setError('Error', err.message));
    }



}

    return (
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body relative">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" ref={emailRef} name='email'  className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type={showPass ? 'text' : 'password'}
                 placeholder="password"
                  name='password'
                   className="input input-bordered" required />
                <button onClick={() => setShowPass(!showPass)} className='absolute right-[50px] mt-[52px]'>
                    {showPass  ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

            {
                success && <p className='text-green-600'>Login Successfully</p>
            }

            {
                error && <p className='text-red-500'>Verify your email first</p>
            }

            <p className='text-sm'>you have no account <Link className='underline' to='/signup'>Sign Up</Link></p>
          </div>
        </div>
        
      
    );
};

export default Login;