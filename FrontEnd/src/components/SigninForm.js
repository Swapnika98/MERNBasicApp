import React, {useState} from 'react'
import { Navigate,useNavigate } from 'react-router';
import Input from './Input';
import styles from './Form.module.css'

export default function SigninForm({headerText, errorMessage, onSubmit, submitButtonText}) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    return (
        <div className={styles.authForm}>
            <h3>{headerText}</h3>
            <form onSubmit={(e)=>{e.preventDefault();onSubmit({phone,password},navigate);}}>
                <Input title="phone" type="number" name="hr_phone" id="hr_phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                <Input title="password" type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <Input type="submit" value={submitButtonText}/>
            </form>
            {errorMessage ? (<h4>{errorMessage}</h4>) : null}
        </div>
    )
}
