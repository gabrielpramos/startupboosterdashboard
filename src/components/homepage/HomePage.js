import React, { Component } from 'react';
import RepositorySearchField from '../repository-search-field/RepositorySearchField';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="component-container">
                <RepositorySearchField />
            </div>
        );
    }
}

export default HomePage;