import React from 'react';
import CheckBox from './CheckBox';

export default class VotingItem extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            yes: 0,
            no: 0,
            voted: false
        }
    }

    render() {
        const {data, changeStatus} = this.props;
        const handleChange = (checked) => changeStatus(data.id, checked);
        const className = 'voting-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');

        return (
            <li className={className}>
                <span className='left'>{data.text}</span>
                <div>
                    <button onClick={() => this.vote('yes', data.id)} className='button btn-success right'>Yes! ({this.state.yes})</button>
                    <button onClick={() => this.vote('no', data.id)} className='button btn-danger right'>No! ({this.state.no})</button>
                </div>
            </li>
        );
    }

    vote(opinion, id) {
        const storage = window.localStorage
        console.log(storage.getItem('voted'+id))
        const prevVote = storage.getItem('voted'+id)
        if(!prevVote || prevVote !== opinion) {
            if(prevVote !== opinion) {
                this.setState({[opinion]: this.state[opinion] + 1, [prevVote]: this.state[prevVote]-1})
            }
            else {
                this.setState({[opinion]: this.state[opinion] + 1})
            }
            storage.setItem('voted'+id, opinion)
        }
    }
}
