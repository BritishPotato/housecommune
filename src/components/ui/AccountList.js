import React from 'react';
import AccountingItem from "./AccountItem";

export default class AccountList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [{name: 'paulie', expense: 'toilet', price: 1234}, {name: 'paulie', expense: 'toilet', price: 1234}, {name: 'paulie', expense: 'toilet', price: 1234}]
        }

        this.getAccounts()
    }

    getAccounts() {
        fetch('http://localhost:5000/accounts', {mode: 'cors'})
            .then(res => res.json())
            .then((data) => {
                this.setState({items: data})
            })
    }


    render() {
        const sum = this.state.items.reduce((item, sum) => {return {price: sum.price+item.price}}).price
        return (
            <div className="container">
                <div className="row">
                    <div className="todolist">
                        <AccountingHeader clickHandler={(item)=> this.addAccount(item)}/>
                        <ul className="list-unstyled">
                            {this.state.items.map((item) => (
                                <AccountingItem data={item}/>
                            ))}
                        </ul>
                        <div>Sum: {sum}$</div>
                        {/*<Footer {...{count, filter, changeFilter, mode, changeMode}}/>*/}
                        {/*<Info {...{mode}}/>*/}
                    </div>
                </div>
            </div>
        );
    }

    addAccount(item) {
        this.setState({items: [item, ...this.state.items]}, ()=>{
            fetch('http://localhost:5000/accounts', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        })
    }
}

class AccountingHeader extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            expense: '',
            price: 0
        }
    }

    render() {
        return (
            <header>
                <h1>House Finance</h1>
                <div className='account-add'>
                    <input
                        placeholder='Name'
                        onChange={(event) => this.setState({name: event.target.value})}
                        value = {this.state.name}
                    />
                    <input
                        placeholder='Expense'
                        onChange={(event) => this.setState({expense: event.target.value})}
                        value = {this.state.expense}
                    />
                    <input
                        placeholder='Price'
                        type='number'
                        onChange={(event) => this.setState({price: event.target.value})}
                        value = {this.state.price}
                    />
                </div>
                <button className='button btn-primary' onClick={() => {this.props.clickHandler(this.state); this.setState({name:'', expense: '', price: 0})}}>Add</button>
            </header>
        )
    }
}