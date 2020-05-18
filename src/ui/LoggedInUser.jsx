import {h} from 'preact';
import {useStore} from 'effector-react';

import {userState} from 'state/user';

import '#/ui/LoggedInUser.scss';

export default function LoggedInUser() {
    const user = useStore(userState);
    
    return (
        <div className="logged-in-user">
            <div className="user-email"> { user?.email } </div>
            <img src={user?.img} alt=""/>
        </div>
    );
}