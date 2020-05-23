import {h} from 'preact';

import '#/component/SmallMenu.scss';

export default function SmallMenu(_) {
    return (
        <div className="small-menu">
            {_.options?.map(option => 
                <div key={option} onClick={() => { _.onSelect?.(option); }} className="small-menu-option">
                    {option.title}
                </div>
            )}
        </div>
    );
}