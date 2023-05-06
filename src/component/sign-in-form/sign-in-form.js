import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../DataBase/firebase/firebase";
import FormInput from "../form-input/form-input";
import './sign-in-form.scss';
import Button from "../button/button";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handlSubmit = async(event) => {
        event.preventDefault();
        
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            alert('Logged in successfully')
            resetFormFields();
        }
        catch(error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found': 
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handlChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});

    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handlSubmit} >
                <FormInput label='Email' type="email" required onChange={handlChange} name = "email" value={email} />
                <FormInput label='Password' type="password" required onChange={handlChange} name = "password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
