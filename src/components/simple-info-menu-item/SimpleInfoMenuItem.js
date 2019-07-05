import React, { Component } from 'react';

class SimpleInfoMenuItem extends Component {

    render() {
        return (
            <div>
                <span>{this.props.itemHeader}</span>
                <span>{this.props.itemBody}</span>
            </div>
        );
    }
}

export default SimpleInfoMenuItem;