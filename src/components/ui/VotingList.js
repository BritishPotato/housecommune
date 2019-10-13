import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import {applyFilter, search} from '../../services/filter';
import VotingItem from "./VotingItem";

export default class VotingList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {list, filter, mode, query} = this.props.data;
        const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery} = this.props.actions;
        const count = list.length;
        const items = search(applyFilter(list, filter), query);

        return (
            <div className="container">
                <div className="row">
                    <div className="todolist">
                        <Header sectionName={'Voting'} {...{addNew, mode, query, setSearchQuery}}/>
                        <ul className="list-unstyled">
                            {items.map(item => (
                                <VotingItem key={item.id} data={item} changeStatus={changeStatus}/>
                            ))}
                        </ul>
                        {/*<Footer {...{count, filter, changeFilter, mode, changeMode}}/>*/}
                        {/*<Info {...{mode}}/>*/}
                    </div>
                </div>
            </div>
        );
    }
}
