import React from 'react';
import StaticItem from './StaticItem';
import {MSG_NO_ITEMS} from '../../assets/text/en_US';

export default function StaticList(props) {
    const {items, changeStatus} = props;

    if (items.length === 0) {
        return (
            <p className="alert alert-info">{MSG_NO_ITEMS}</p>
        );
    }

    return (
        <ul className="list-unstyled">
            {items.map(item => (
                <StaticItem key={item.id} data={item} changeStatus={changeStatus}/>
            ))}
        </ul>
    );
}
