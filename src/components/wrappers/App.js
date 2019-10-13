import React, {Component} from 'react';
import TodoList from '../ui/TodoList';
import StateProvider from './StateProvider';
import KeyStrokeHandler from './KeyStrokeHandler';
import VotingList from "../ui/VotingList";

class App extends Component {
    render() {
        return (
            <StateProvider>
                <VotingList/>
            </StateProvider>
        );
    }
}

export default App;
