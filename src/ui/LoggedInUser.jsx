import {h}        from 'preact';
import {route} from 'preact-router';
import {useState, useCallback} from 'preact/hooks';
import {useStore} from 'effector-react';

import {userState} from 'state/user';

import '#/ui/LoggedInUser.scss';

export default function LoggedInUser() {
    const user = useStore(userState);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen(!menuOpen);
    }, [menuOpen, setMenuOpen]);
    
    return (
        <div className="logged-in-user-container">
            <div onClick={toggleMenu} className="logged-in-user">
                <div className="user-email"> { user?.email } </div>
                <img src={user?.profilePicture} alt=""/>
            </div>

            <div data-status={menuOpen ? 'open' : 'closed'} className="open-menu-thingy">
                <div onClick={() => { toggleMenu(); route('/settings'); }} className="drop-menu-item"> Settings </div>
                <div className="drop-menu-item"> Logout </div>
            </div>
        </div>
    );
}