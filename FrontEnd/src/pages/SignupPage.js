import React,{useContext} from 'react'
import { Context as AuthContext } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';
import MainHeader from '../components/MainHeader.js';
import styles from './AuthPage.module.css';

export default function SignupPage() {
    const { state, signup } = useContext(AuthContext);
    return (
            <><MainHeader />
        <div className={styles.authPage}>
            <SignupForm headerText="Sign up for Tracker" errorMessage={state.errorMessage} submitButtonText="Sign up" onSubmit={signup} />
            <Link to='/signin'>Already have an account? Sign in instead!</Link>
        </div></>
    )
}
