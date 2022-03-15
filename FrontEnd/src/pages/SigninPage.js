import React,{useContext} from 'react'
import SigninForm from '../components/SigninForm.js'
import { Context } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import MainHeader from '../components/MainHeader.js';
import styles from './AuthPage.module.css';

export default function SigninPage() {
    const { state, signin } = useContext(Context);
    return (
            <><MainHeader />
        <div className={styles.authPage}>
            <SigninForm
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />
            <Link to='/signup'>Don't have an account? Sign up instead!</Link>
        </div></>
    )
}
