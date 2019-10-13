import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import StaticList from './StaticList';
import {applyFilter, search} from '../../services/filter';
import RulesJsonData from "../../../data/rules.json";

export default function TodoList(props) {
    const {list, filter, mode, query} = props.data;
    const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery} = props.actions;
    const count = list.length;
    const items = search(applyFilter(list, filter), query);

    return (
        <div className="container">
            <div className="col">
                <div className="todolist">
                    <h1>Rules</h1>
                    <StaticList {...{items, changeStatus}}/>
                    {/* {JSON.stringify(items, null, 2) } */}
                    {/* <div><pre>{JSON.stringify(RulesJsonData, null, 2) }</pre></div> */}
                </div>
            </div>
        </div>
    );
}
