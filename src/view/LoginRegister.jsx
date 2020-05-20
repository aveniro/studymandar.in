import {Fragment, createRef, h} from 'preact';
import {useCallback, useEffect} from 'preact/hooks';
import {useStore}               from 'effector-react';

import firebase from '@/firebase';

import {userState} from 'state/user';

import TextInput from '@/ui/TextInput';
import Button    from '@/ui/Button';

import regex from '@/regex';

import {toast} from '@/component/Toaster';

import '#/view/LoginRegister.scss';

export default function LoginRegister() {
    const user = useStore(userState);

    const emailRef = createRef();
    const passwordRef = createRef();

    const doLoginRegister = useCallback(() => {
        const email = emailRef.current.value();
        const pass = passwordRef.current.value();

        firebase.auth().signInWithEmailAndPassword(email, pass).catch(e => {
            console.log(e);

            switch(e.code) {
            case 'auth/invalid-email': {
                toast({title: 'That email doesn\'t look quite right...'});
                break;
            }

            case 'auth/user-disabled': {
                toast({title: 'It seems like your account has been disabled...'});
                break;
            }

            case 'auth/user-not-found': {
                firebase.auth().createUserWithEmailAndPassword(email, pass).catch(e => {
                    switch(e.code) {
                    case 'auth/invalid-email': {
                        toast({title: 'That email doesn\'t look quite right...'});
                        break;
                    }

                    case 'auth/weak-password': {
                        toast({title: 'Please use a stronger password...'});
                        break;
                    }
                    }
                });
                break;
            }

            case 'auth/wrong-password': {
                toast({title: 'Please double-check your password...'});
                break;
            }

            default: {
                toast({title: 'Something unexpected happened, please try again later.'});
                break;
            }
            }
        });
    });

    useEffect(() => {        
        const keydown = e => {
            if(e.key === 'Enter') {
                doLoginRegister();
            }
        };
        document.addEventListener('keydown', keydown);

        return () => {
            document.removeEventListener('keydown', keydown);
        };
    }, [doLoginRegister]);

    let display;
    if(user) {
        display = `Successfully signed in as ${user.email}!`;
    } else {
        display = (
            <Fragment>
                <TextInput ref={emailRef} regex={regex.email} hint="user@example.com" title="Email" />
                <TextInput ref={passwordRef} regex={regex.password} hint="hunter2" title="Password" secure={true} />
                <Button onClick={doLoginRegister} title="Start" />
            </Fragment>
        );
    }

    return (
        <div className="login-register-container">
            <div className="login-register">
                { display }
            </div>
        </div>
    );
}