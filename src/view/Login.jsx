import {Fragment, createRef, h} from 'preact';
import {useStore} from 'effector-react';

import firebase from '@/firebase';

import {userState} from 'state/user';

import TextInput from '@/ui/TextInput';
import Button from '@/ui/Button';

import {toast} from '@/component/Toaster';

import '#/view/LoginRegister.scss';

export default function Login() {
    const user = useStore(userState);

    const emailRef = createRef();
    const passwordRef = createRef();

    const doLogin = () => {
        firebase.auth().signInWithEmailAndPassword(emailRef.current.value(), passwordRef.current.value()).catch(() => {
            toast({title: 'Unable to sign in...'});
        });
    };

    let display;
    if(user) {
        display = `Successfully signed in as ${user.email}!`;
    } else {
        display = (
            <Fragment>
                <TextInput ref={emailRef} hint="user@example.com" title="Email" />
                <TextInput ref={passwordRef} hint="hunter2" title="Password" secure={true} />
                <Button onClick={doLogin} title="Login" />
            </Fragment>
        );
    }

    return (
        <div className="login-container">
            <div className="login">
                { display }
            </div>
        </div>
    );
}