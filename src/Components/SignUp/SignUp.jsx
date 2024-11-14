import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../Layout/Firebase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';



const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSignUp = e => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        console.log(email, password, terms, name, photo);


        // create user

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

        if (!passwordRegex.test(password)) {

            setErrorMessage('Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;

        }

        if (password == passwordRegex) {
            setErrorMessage('Password should be at least 6 characters or long.');
            return
        }

        if (!terms) {
            setErrorMessage('Please Accept Our Terms and Conditions');
            return;
        }



        // default
        setErrorMessage('');
        setSuccess(false);



        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
              
                
              
                    setSuccess(result);
               
                
                


                    // send verification email

                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Email verification sent!')
                    })

                    // update profile name ans photo

                    const profile = {
                        displayName: name,
                        photoURL: photo
                    }

                    updateProfile(auth.currentUser, profile )
                    .then( () => {
                        console.log('Profile updated!')
                    })
                    .catch(err => {
                        console.log(err);
                    })



            })
            .catch(err => {
                setErrorMessage(err.message);
                setSuccess(false);
            })
    }

    // const handleShowPassWord = () => {

    //     setShowPassword(!showPassword);



    // };
    return (

        <div className="card bg-base-100  border mt-5">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />

                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" name='photo' placeholder="photo Url" className="input input-bordered"  />

                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className='absolute right-20 mt-[50px]'>


                        {showPassword ? <FaEyeSlash className='text-[20px]'></FaEyeSlash> : <FaEye className='text-[20px]'></FaEye>}
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>


                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                        <input type="checkbox" name='terms' className="checkbox checkbox-primary" />
                        <span className="label-text ml-3">Accept Our Trams & Conditions</span>

                    </label>
                </div>



                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>

            </form>

            {
                errorMessage && <p className='text-red-500'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-600'>Sign Up is Successful </p>
            }

            <p className='text-sm'>you have already account <Link className='underline' to='/login'>Login</Link></p>
        </div>

    );
};

export default SignUp;