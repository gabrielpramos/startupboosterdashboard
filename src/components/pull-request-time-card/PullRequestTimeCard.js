import React, { Component } from 'react';
import SimpleInfoCard from '../simple-info-card/SimpleInfoCard';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value,
    mergeDataInsightsState: store.mergeDataInsightsState.value,

})

const enhance = compose(
    connect(mapStateToProps)
);

const initialState = { cardTitle: 'Average Pull Request Merge Time', value: '' };

class PullRequestTimeCard extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {

        return (
            <SimpleInfoCard cardTitle={this.state.cardTitle} cardValue={this.state.value} />
        );
    }
}
export default enhance(PullRequestTimeCard);