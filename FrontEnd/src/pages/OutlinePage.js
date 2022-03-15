import React,{useState,useEffect} from 'react'
import MainHeader from '../components/MainHeader.js';

export default function OutlinePage({children}) {
    const [loggedIn,setLoggedIn] = useState(false);
    const [user,setUser] = useState(null)

    useEffect(()=>{
        async function fetchData() {
            const user = await JSON.parse(sessionStorage.getItem('user'));
            if(user) {
                setLoggedIn(true);
                setUser(user);
            }
        }
        fetchData();
    },[])

    const logout = () => {
        setLoggedIn(false);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }
    return (
        <>
           <MainHeader loggedIn={loggedIn} logout={logout} />
           {loggedIn ? <>{children}</> : <h1>You do not have access to this page. Please login and try again</h1>} 
        </>
    )
}
