import {h, createRef} from 'preact';

import firebase from '@/firebase';

import Button from '@/ui/Button';
import TextInput from '@/ui/TextInput';

export default function Register() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordRepeatRef = createRef();

    const doRegister = () => {
        if(passwordRef.current.value() === passwordRepeatRef.current.value()) {
            firebase.auth().createUserWithEmailAndPassword(emailRef.current.value(), passwordRef.current.value());
        }
    };

    return (
        <div className="register-container">
            <div className="register">
                <TextInput ref={emailRef} hint="user@example.com" title="Email Address" />
                <TextInput ref={passwordRef} hint="hunter2" title="Password" secure={true} />
                <TextInput ref={passwordRepeatRef} hint="hunter2" title="Password Repeat" secure={true} />

                <Button onClick={doRegister} title="Register" />
            </div>
        </div>
    );
}