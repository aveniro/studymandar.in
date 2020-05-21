import {Fragment, createRef, h} from 'preact';
import {useCallback, useEffect} from 'preact/hooks';
import {useStore}               from 'effector-react';

import {userApi, userState} from 'state/user';

import TextInput from '@/ui/TextInput';
import Button    from '@/ui/Button';

import regex from '@/regex';

import '#/view/LoginRegister.scss';

export default function LoginRegister() {
    const user = useStore(userState);

    const emailRef = createRef();
    const passwordRef = createRef();

    const doLoginRegister = useCallback(() => {
        const email = emailRef.current.value();
        const pass = passwordRef.current.value();

        userApi.requestLoginRegister({email, pass});
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