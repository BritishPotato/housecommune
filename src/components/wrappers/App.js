import React, {Component} from 'react';
import RulesList from '../ui/RulesList';
import StateProvider from './StateProvider';
import VotingList from "../ui/VotingList";

class App extends Component {
    render() {
        return (
            <section>
                <StateProvider>
                    <RulesList/>
                </StateProvider>
                <StateProvider>
                    <VotingList/>
                </StateProvider>
            </section>
        );
    }
}

export default App;
