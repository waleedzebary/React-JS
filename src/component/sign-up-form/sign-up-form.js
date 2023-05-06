import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../DataBase/firebase/firebase";
import FormInput from "../form-input/form-input";
import './sign-up.scss';
import Button from "../button/button";

const defaultFormFields = {
    username: '',
    email: '',
    password: '',
    confrimPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, email, password, confrimPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handlSubmit = async(event) => {
        event.preventDefault();
        if (password !== confrimPassword ){
            alert("password don't match")
            return;
        }
        
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {username});
            alert('Your account has been created successfully')
            resetFormFields();
        }
        catch(error) {
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            else{
                console.log('user  creation encountered an error', error);
            }
        }
    };
    

    const handlChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});

    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handlSubmit}>
                <FormInput label='Username' type="text" required onChange={handlChange} name = "username" value={username} />

                <FormInput label='Email' type="email" required onChange={handlChange} name = "email" value={email} />

                <FormInput label='Password' type="password" required onChange={handlChange} name = "password" value={password} />

                <FormInput label='Confrim Password ' type="password" required onChange={handlChange} name = "confrimPassword" value={confrimPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;
