import React, { Component } from 'react';
import './SimpleInfoMenuItem.css';

class SimpleInfoMenuItem extends Component {

    render() {
        return (
            <div className="tab-text-container">
                <div className="tab-header">
                    {this.props.itemHeader}
                    <span className="tab-text-container">{this.props.itemBody}</span>
                </div>

            </div>
        );
    }
}

export default SimpleInfoMenuItem;