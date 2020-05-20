import {h}        from 'preact';
import {useStore} from 'effector-react';
import {Link}     from 'preact-router/match';

import {userState} from 'state/user';

import LoggedInUser from '@/ui/LoggedInUser';

import '#/component/TopBar.scss';

export default function TopBar() {
    const user = useStore(userState);

    return (
        <div className="top-bar">
            <div className="top-bar-title">我爱中文！</div>

            {
                user ? <LoggedInUser /> : 
                    <div className="login-register-buttons">
                        <Link activeClassName="active" href="/start">Start</Link>
                    </div>
            }
        </div>
    );
}