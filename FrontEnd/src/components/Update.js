import React, { useEffect, useState } from 'react';
import trackerApi from "../api/tracker";
import EmployeeForm from '../components/EmployeeForm';
import OutlinePage from './OutlinePage.js';
import styles from './Create.module.css';

export default function Update(props) {
    const [dataIsPresent,setDataIsPresent] = useState(false);
    const [apiData, setApiData] = useState('');

    const [updatedData,setUpdatedData] = useState({})
    const [updateFormSubmit,setUpdateFormSubmit] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(()=>{
        const fetchApi = async () => {
            try {
                sessionStorage = await JSON.parse(sessionStorage.getItem('user'))
                const response = await trackerApi.get(`fetch/${window.location.href.split('fetch/')[1]}`, {
                    headers: {
                      'user_id': `${user._id}`
                    }
                  });
                if(response.status === 200) {
                    const data = response.data;
                    setApiData(data);
                    setDataIsPresent(true);
                } else {
                    setDataIsPresent(false);
                    setResponseError(true);
                    console.error(`Error ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                setDataIsPresent(false);
                setResponseError(true);
                console.error(`Error ${error}`);
            }
            
        }
        apiData==='' && fetchApi()
        if(Object.keys(apiData).length){
            setName(apiData.post.name);
            setEmail(apiData.post.email);
            setSalary(apiData.post.salary);
            setPhone(apiData.post.phone)
        }
    },[apiData])

    useEffect(()=>{
        const updateApi = async () => {
            try {
                sessionStorage = await JSON.parse(sessionStorage.getItem('user'))
                const data = {name,email,phone,salary,hr_id: user._id}
                const response = await trackerApi.put(`fetch/${window.location.href.split('fetch/')[1]}`, data);
                if(response.status === 200) {
                    const data = response.data;
                    setUpdatedData(data);
                    setDataIsPresent(true);
                } else {
                    setDataIsPresent(false);
                    setResponseError(true);
                    console.error(`Error ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                setDataIsPresent(false);
                setResponseError(true);
                console.error(`Error ${error}`);
            }
            
        }
        updateFormSubmit && updateApi()
    },[updateFormSubmit])

    const onSubmit = (name,email,phone,salary) => {
        setName(name)
        setEmail(email)
        setPhone(phone)
        setSalary(salary)
        setUpdateFormSubmit(true)
    }



    return (
        <OutlinePage>
            {!dataIsPresent?(
                <h1>Loading..</h1>
            ):( !Object.keys(updatedData).length?(
                <EmployeeForm className={styles.createContainer} name={name} email={email} phone={phone} salary={salary} onSubmit={onSubmit} />
            ) : (updateFormSubmit? 
                (!Object.keys(updatedData).length ? (<h1>Updating..</h1>) : (<h1>Success..</h1>)
                ) : <h1>Try Again..</h1> )
            )}
        </OutlinePage>
    )
}
