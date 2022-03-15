import trackerApi from "../api/tracker";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import OutlinePage from "./OutlinePage";
import styles from './Fetch.module.css'

export default function Fetch() {

    const [userId,setUserId] = useState(null)

    const [dataIsPresent,setDataIsPresent] = useState(false);
    const [apiData, setApiData] = useState('');
    const [responseError,setResponseError] = useState(false);

    const [delEmpId,setDelEmpId] = useState(0)
    const [deleteRecord, setDeleteRecord] = useState(false);

    useEffect(()=>{
        const fetchApi = async () => {
            try {
                const user = await JSON.parse(sessionStorage.getItem('user'))
                setUserId(user._id);
                const response = await trackerApi.get('/fetch', {
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
        deleteRecord || fetchApi()
    },[deleteRecord])

    useEffect(()=>{
        const deleteEmp = async () => {
            try {
                const response = trackerApi.delete(`/fetch/${delEmpId}`)
                setDeleteRecord(false)
            } catch {
            }
        }
        deleteRecord && deleteEmp();
    },[deleteRecord])

    return (
        <OutlinePage>
        
            {!dataIsPresent? (
                <div>
                    {responseError?<h2>Bad request. Please try again</h2>:<h2>Loading...</h2>}
                </div>
            ) : (
                <div className={styles.fetchContainer}>
                    {apiData.posts.filter((emp,index)=>(
                        emp.hr_id === userId
                    )).map((emp,index)=>(
                        <div key={index} className={styles.fetchedEmp}>
                            <div>
                                <h2>Name: <span>{emp.name}</span></h2>
                                <h2>Email: <span>{emp.email}</span></h2>
                                <h2>Phone: <span>{emp.phone}</span></h2>
                                <h2>Salary: <span>{emp.salary}</span></h2>
                            </div>
                            <ul>
                                <li>
                                    <Link to={`/fetch/${emp._id}`}>Update</Link>
                                </li>
                                <li>
                                    <button onClick={()=>{setDeleteRecord(true);setDelEmpId(emp._id)}}>Delete</button>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            {deleteRecord ? <div style={{width: '100vh', height: '100vh', position: 'absolute', top: '0', left: '0', backgroundColor: 'pink'}}></div> : ''}
        </OutlinePage>
    )
}
