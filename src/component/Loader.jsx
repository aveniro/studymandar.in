import {h}        from 'preact';
import {useState} from 'preact/hooks';
import {useStore} from 'effector-react';

import {loadStore} from 'state/ui';

import loadingMessages from '@/loadingMessages.json';

import '#/component/Loader.scss';

export default function Loader() {
    const loadState = useStore(loadStore);
    const [message] = useState(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);

    return (
        <div data-status={loadState} className="loader">
            <div className="load-box">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <path fill="#FFFFFF" d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z"></path>
                </svg>
            </div>
            <div className="message-area">
                {message}
            </div>
        </div>
    );
}