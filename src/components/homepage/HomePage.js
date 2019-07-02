import React, { Component } from 'react';
import RepositorySearchField from '../repository-search-field/RepositorySearchField';
import './HomePage.css';
import MergeGraphCard from '../merge-graph-card/MergeGraphCard';

class HomePage extends Component {
    render() {
        return (
            <div className="component-container">
                <RepositorySearchField />
                <div className="graph-components-container">
                    <MergeGraphCard />
                </div>
            </div>
        );
    }
}

export default HomePage;