import React, {Component} from 'react';
import RulesList from '../ui/RulesList';
import StateProvider from './StateProvider';
import VotingList from "../ui/VotingList";
import AccountList from "../ui/AccountList";

class App extends Component {
    render() {
        return (
            <section>
                <StateProvider>
                    <VotingList/>
                </StateProvider>
                <StateProvider>
                    <AccountList/>
                </StateProvider>
                <StateProvider>
                    <RulesList/>
                </StateProvider>
            </section>
        );
    }
}

export default App;
