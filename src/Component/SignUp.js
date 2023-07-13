import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = (props) => {
  const url = "http://localhost:5000";
  let history = useNavigate();
  const [credential, setCredential] = useState({name:"",email: "", password: "",cpassword:"",number:+91});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credential.name,
        email:credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
   
      localStorage.setItem("token", json.token); //Saving the token in the local storage
      history("/"); 
      props.showAlert("Account Created Successfully","success");
    } else {
      props.showAlert("Invalid Credentials","danger");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credential.name} onChange={onChange} aria-describedby="emailHelp" required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"value={credential.email} onChange={onChange}aria-describedby="emailHelp" required minLength={5}/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credential.password}name="password"onChange={onChange}required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" value={credential.cpassword}name="cpassword"onChange={onChange} aria-describedby="emailHelp" required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <div className='container my-3'>
  <div style={{display: 'inline-block', width:"250px"}}>

</div>
</div>
</form>
        </div>
  )
}

export default SignUp
