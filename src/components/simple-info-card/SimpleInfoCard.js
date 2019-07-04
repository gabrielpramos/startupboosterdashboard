import React, { Component } from 'react';
import { Card } from 'element-react';
import './SimpleInfoCard.css';

import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = store => ({
    mergeDataInsightsState: store.mergeDataInsightsState.value,
})

const enhance = compose(
    connect(mapStateToProps)
);

class SimpleInfoCard extends Component {
    render() {
        return (
            <Card className="box-card half-row-presentation"
                header={
                    <div className="clearfix">
                        <span style={{ "lineHeight": "36px" }}>{this.props.cardTitle}</span>
                    </div>
                }>
                <div className="text-item">{this.props.cardValue}</div>
            </Card>
        );
    }
}

export default enhance(SimpleInfoCard);