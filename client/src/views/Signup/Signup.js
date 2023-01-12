import React, {useState} from "react";
import axios from 'axios'
import "./Signup.css"

function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('user')

   async function signupUser() {
    const response = await axios.post('/signup', {
        name:name,
        email:email,
        phone:phone,
        password:password,
        role:role
    })
    console.log(response.data)
    if(response.data.success){
        alert(response.data.message)
        window.location.href = '/login'
    }
     else{
        alert(response.data.message)
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
     }

   }


    return (
        <div>
            <h1 className="text-center">Signup</h1>
            <div className="row">
                <div className="col-md-6">

                </div>

                <div className="col-md-6">
                    <div className="form-container">
                        <form>
                            <div > 
                            <label htmlFor="name"> Full Name:</label>
                            <input type='text' id="name"placeholder="Enter Name" 
                             className='user-input'
                             value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>

                            <div > 
                            <label htmlFor="email"> Email:</label>
                            <input type='email' id="email"placeholder="Enter Email" 
                             className='user-input'
                             value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div > 
                            <label htmlFor="phone"> Phone:</label>
                            <input type='text' id="phone"placeholder="Enter Phone" 
                             className='user-input'
                             value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>

                            <div > 
                            <label htmlFor="password"> Password:</label>
                            <input type='password' id="password"placeholder="Enter password" 
                             className='user-input'
                             value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <div>
                                <button type="button" className="signup-button" onClick={signupUser}>Signup</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Signup