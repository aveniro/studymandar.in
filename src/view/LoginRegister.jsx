import {Fragment, createRef, h}           from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useStore}                         from 'effector-react';

import {userApi, userState} from 'state/user';

import TextInput from '@/ui/TextInput';
import Button    from '@/ui/Button';

import regex from '@/regex';

import '#/view/LoginRegister.scss';

export default function LoginRegister() {
    const user = useStore(userState);
    const [loading, setLoading] = useState(false);

    const emailRef = createRef();
    const passwordRef = createRef();

    const doLoginRegister = useCallback(() => {
        setLoading(true);

        const email = emailRef.current.value();
        const pass = passwordRef.current.value();

        userApi.requestLoginRegister({email, pass});
    }, [emailRef, passwordRef, setLoading]);

    useEffect(() => {        
        const keydown = e => {
            if(e.key === 'Enter') {
                doLoginRegister();
            }
        };
        document.addEventListener('keydown', keydown);

        const unwatch = userApi.rejectLoginRegister.watch(() => {
            setLoading(false);
        });

        return () => {
            unwatch();
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
                <Button loading={loading} onClick={doLoginRegister} title="Start" />
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