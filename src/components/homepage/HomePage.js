import React, { Component } from 'react';
import RepositorySearchField from '../repository-search-field/RepositorySearchField';
import './HomePage.css';
import MergeGraphCard from '../merge-graph-card/MergeGraphCard';
import PullRequestTimeCard from '../pull-request-time-card/PullRequestTimeCard';

class HomePage extends Component {
    render() {
        return (
            <div className="component-container">
                <RepositorySearchField />
                <div className="graph-components-container">
                    <MergeGraphCard />
                    <PullRequestTimeCard />
                    <PullRequestTimeCard />
                </div>
            </div>
        );
    }
}

export default HomePage;