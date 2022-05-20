import React, { useContext, useState } from 'react';
import firebaseConfig from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';

const app = initializeApp(firebaseConfig);

const LoginSignUp = () => {

    const { user,setUser } = useContext(AppContext);

    const [loginSignUpFlag, setLoginSignUpFlag] = useState(true);
    const [msg, setMsg] = useState('');
    const navigate=useNavigate();

    const signUpHandler = (flag) => {
        setLoginSignUpFlag(flag);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveUser = (uid,email,password) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid,email,password })
        };
        fetch('http://localhost:5000/addUser', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

    }

    const showSignUpForm = (auth, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user-->>', user);
                setMsg('Created User Successfully');

                //Now add into Database
                
                saveUser(user.uid,user.email,password);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMsg(errorMessage)
            });
    }

    const showLoginForm = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('loggedInUser',  email);
                setMsg('Logged In successful');
                setUser(email)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMsg(errorMessage)
            });
    }

    const onSubmit = (data, e) => {
        const { userid, email, password } = data;
        const auth = getAuth();

        if (loginSignUpFlag) {
            showLoginForm(auth, email, password)
        }
        else {
            showSignUpForm(auth, email, password);
        }
        e.target.reset();
    };


    return (
        <div>
            <button onClick={() => signUpHandler(false)}>Sign Up </button>
            <button onClick={() => signUpHandler(true)}>Log in </button>
            

            <form onSubmit={handleSubmit(onSubmit)}>
                {!loginSignUpFlag && <input placeholder='userid' {...register('userid')} />}
                <input placeholder='email' {...register('email', { required: true })} />
                {errors.email && <p>Email is required.</p>}
                <input placeholder='password' {...register('password', { required: true })} />
                {errors.password && <p>Please enter password.</p>}
                <input type="submit" />
            </form>
            {msg}

        </div>
    );
};

export default LoginSignUp;