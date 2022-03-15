import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import MainHeader from '../components/MainHeader.js';
import styles from './Home.module.css'
import OutlinePage from './OutlinePage.js';

export default function Home() {
    const [user,setUser] = useState(null)

    useEffect(async ()=>{
        sessionStorage = await JSON.parse(sessionStorage.getItem('user'));
        if(user) {
            // setLoggedIn(true);
            setUser(user);
        }
    },[])

    return (
        <OutlinePage>
           {user ? (<div className={styles.homeContainer}>
                <img src={'http://localhost:3000/' + user.profile} alt={`${user.name} image`} />
                <h1>Welcome {user.name}</h1>
                <p>Select the action you want to perform</p>
                <ul>
                    <li>
                        <Link to='/create'>Create an employee record</Link>
                    </li>
                    <li>
                        <Link to='/fetch'>Fetch employee records</Link>
                    </li>
                </ul>
            </div>) : ''}
        </OutlinePage>
    )
}
