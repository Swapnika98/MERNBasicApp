import React, {useState} from 'react'
import { Navigate,useNavigate } from 'react-router';
import Input from './Input';
import styles from './Form.module.css'

export default function SignupForm({headerText, errorMessage, onSubmit, submitButtonText}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('');
    
    let navigate = useNavigate();

    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       });
    
      const handleInputChange = (event) => {
        setuserInfo({
          ...userInfo,
          file:event.target.files[0],
          filepreview:URL.createObjectURL(event.target.files[0]),
        });
    
      }

    return (
        <div className={styles.authForm}>
            <h3>{headerText}</h3>
            <form encType="multipart/form-data" onSubmit={(e)=>{e.preventDefault();onSubmit({name,email,phone,password,userInfo},navigate);}}>
                <Input title="Name" type="text" name="hr_name" id="hr_name" value={name} onChange={(e)=>setName(e.target.value)} />
                <Input title="Email" type="email" name="hr_email" id="hr_email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Input title="Phone" type="number" name="hr_phone" id="hr_phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                <Input title="Password" type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                {/* <Input title="Profile" type="url" name="profile" id="profile" value={profile} onChange={(e)=>setProfile(e.target.value)} /> */}
                <Input title="Profile" type="file" name="profile" accept="image/png, image/jpg, image/jpeg" onChange={(e)=>handleInputChange(e)} />
                <Input type="submit" value={submitButtonText}  />
            </form>
            {errorMessage ? (<h4>{errorMessage}</h4>) : null}
        </div>
    )
}
