import React from 'react';

export default class AccountingItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const {data, changeStatus} = this.props;
        console.log(this.props)
        return (
            <li className='voting-item ui-state-default pending'>
                <td>{data.name}</td>
                <td>{data.expense}</td>
                <td>{data.price}$</td>
            </li>
        );
    }
}
