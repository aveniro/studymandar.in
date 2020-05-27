import {h} from 'preact';
import {useStore} from 'effector-react';
import {userState} from 'state/user';
import TopBar from '@/component/TopBar';

import '#/view/Settings.scss';

const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Settings() {
    const user = useStore(userState);

    const created = new Date(user?.metadata.creationTime);
    const creationDateString = `${months[created.getMonth()]} ${created.getFullYear()}`;

    return (
        <div className="settings">
            <TopBar />
            <div className="settings-area">
                <div className="user-information">
                    <div className="settings-profile-pic">
                        {user?.profilePicture ? 
                            <img src={user?.profilePicture} alt=""/>
                        :
                            <div className="upload-picture"></div>
                        }
                    </div>

                    <div className="email">
                        {user?.email} {user && !user.emailVerified ? <a href="https://studymandar.in">Verify</a> : ''}
                    </div>

                    <div className="user-since">
                        Member Since: {creationDateString}
                    </div>
                </div>
                <div className="settings-body">
                        <div className="settings-title">Notifications</div>
                </div>
            </div>
        </div>
    );
}