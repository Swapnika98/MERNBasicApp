import React,{useState} from 'react'
import Input from './Input';
import styles from './Form.module.css'

export default function EmployeeForm({className,name,email,phone,salary,onSubmit,errorMessage}) {
    const [empname, setName] = useState(name);
    const [empemail, setEmail] = useState(email);
    const [empsalary, setSalary] = useState(salary);
    const [empphone, setPhone] = useState(phone);
    return (
        <div className={className}>
            <form className={styles.authForm} onSubmit={(e)=>{e.preventDefault();onSubmit(empname,empemail,empphone,empsalary)}}>
                <h3>Add your employee details</h3>
                <Input title="Name" type="text" name="name" id="name" value={empname} onChange={(e)=>setName(e.target.value)} required />
                <Input title="Email" type="email" name="email" id="email" value={empemail} onChange={(e)=>setEmail(e.target.value)} required/>
                <Input title="Phone" type="number" name="phone" id="phone" value={empphone} onChange={(e)=>setPhone(e.target.value)} required/>
                <Input title="Salary" type="number" name="salary" id="salary" value={empsalary} onChange={(e)=>setSalary(e.target.value)} required/>
                <Input type="submit" value={"Submit Details"}  />
            </form>
            {errorMessage ? (<h4 className={styles.errorMessage}>{errorMessage}</h4>) : null}
        </div>
    )
}
