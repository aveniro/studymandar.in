import {h}                        from 'preact';
import {useEffect, useState}      from 'preact/hooks';
import {createEvent, createStore} from 'effector';
import {useStore}                 from 'effector-react';

import '#/component/Toaster.scss';

export const toast = createEvent();

const deleteToast = createEvent();
const toasts = createStore([]);

toasts.on(deleteToast, state => [...state].slice(1));

function Toast(_) {
    const [status, setStatus] = useState('showing');

    useEffect(() => {
        setTimeout(() => {
            setStatus('hiding');
        }, 3000);
    });

    return (
        <div data-status={status} className="toast">{_.data.title}</div>
    );
}

toasts.on(toast, (oldState, toastData) => {
    const toastEl = <Toast data={toastData} />;

    setTimeout(() => {
        deleteToast();
    }, 5000);

    return [...oldState, toastEl];
});

export function Toaster() {
    const toastState = useStore(toasts);

    return (
        <div className="toaster">
            { toastState }
        </div>
    );
}