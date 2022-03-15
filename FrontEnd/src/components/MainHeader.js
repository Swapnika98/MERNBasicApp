import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './MainHeader.module.css'

export default function MainHeader({loggedIn,logout}) {
    const [user,setUser] = useState(null)
    useEffect( async () => {
        const user = await JSON.parse(sessionStorage.getItem('user'));
        setUser(user)
    }, [])
    return (
        <header className={styles.header}>
            <h3>Staff Management</h3>
            {(loggedIn && user) ? (
                <nav>
                   <Link to='/create'>Create record</Link> 
                   <Link to='/fetch'>Manage records</Link>
                   <Link to='/home'>{user.name}</Link>
                   <button onClick={()=>logout()}>Sign Out</button>
                </nav>
            ) : (
                <nav>
                   <Link to='/signin'>Sign In</Link> 
                   <Link to='/signup'>Sign Up</Link>
                </nav>
            )}
        </header>
    )
}
