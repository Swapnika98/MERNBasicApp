import trackerApi from "../api/tracker";
import React, { useEffect, useState } from 'react'
import EmployeeForm from "../components/EmployeeForm";
import OutlinePage from './OutlinePage.js';
import { Link } from "react-router-dom";
import styles from './Create.module.css';

export default function Create() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [phone, setPhone] = useState('');

    const [dataIsPresent,setDataIsPresent] = useState(false);
    const [apiData, setApiData] = useState('');
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchApi = async () => {
            try {
                let hr = await JSON.parse(sessionStorage.getItem('user'))
                let data = {name,email,salary,phone,hr_id:hr._id}
                const response = await trackerApi.post("/create", {headers: {
                    'Content-Type': 'application/json',
                }, data: JSON.stringify(data)});
                setApiData(response.data)
                setDataIsPresent(true)
            } catch {
                setError(true)
            }
        }
        dataIsPresent && fetchApi();
    },[dataIsPresent])

    const onSubmit = (name,email,phone,salary) => {
        setName(name)
        setEmail(email)
        setPhone(phone)
        setSalary(salary)
        setDataIsPresent(true)
    }

    return (
        <OutlinePage>
        {!error ? (!dataIsPresent? (
            <EmployeeForm className={styles.createContainer} name={name} email={email} phone={phone} salary={salary} onSubmit = {onSubmit}/>
        ):(
            apiData? (
                <>
                    <h1 style={{textAlign: 'center'}}>{apiData.message}</h1>
                    <ul className={styles.navLink}><li>
                        <Link to='/home'>Click here to go back</Link>
                    </li></ul>
                </>
            ) : (<h1>Loading...</h1>)
        )): (<>
        <EmployeeForm className={styles.createContainer} name={name} email={email} phone={phone} salary={salary} onSubmit = {onSubmit} errorMessage={'An employee already exists'}/>
        </>
        )}
        </OutlinePage>
    )
}
