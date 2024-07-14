import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {add} from "../../Redux/Reducers/AllMailReducer";

export default function SignUp() {

    const [values, setValues] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        let mailId = localStorage.getItem('email');
        if(mailId){
            navigate('/home');
        }
    },[])

    const validateEmail = () => {
        // Regular expression for validating an email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(values);
    };


    const handleChange = (e) => {
        e.preventDefault();
        setValues(e.target.value);
    }

    const handleSubmit = () => {
        if (validateEmail()) {
            dispatch(add(values));
            setValues("");
            navigate("/");
        } else {
            alert('Enter valid credentials');
        }
    }

    return (
        <>
            <div style={{backgroundImage: 'url("https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vdmllc3xlbnwwfHwwfHx8MA%3D%3D")', height: '100vh', backgroundSize: 'cover' }}>
                <div className="login-container container w-100 h-100">
                    <form className='w-50 m-auto border bg-dark border-success rounded' onSubmit={handleSubmit}>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label text-white">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                value={values}
                                onChange={handleChange}
                            />
                             <div id="emailHelp" className="form-text text-white">
                                After signup it will redirect to login page.
                            </div>
                        </div>
                        <button type="submit" className="m-3 btn btn-success">
                            Sign in
                        </button>
                        <button className="m-3 btn btn-danger" onClick={()=>navigate("/")}>
                            Already user
                        </button>
                    </form>
                </div>
                <ToastContainer/>
            </div>
        </>
  );
}
