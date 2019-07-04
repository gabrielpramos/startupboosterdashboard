import React, { Component } from 'react';
import SimpleInfoCard from '../simple-info-card/SimpleInfoCard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import utils from '../../utils/utils';
import gitapi from '../../services/request';
import MathUtils from '../../utils/MathUtils';

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

    concatNodeArray(nodeArray) {
        return this.state.data.nodes.concat(nodeArray);
    }

    fillStateByFetching = (fetchedData) => {
        if (this.nodeFillingCondition()) {
            this.attState(gitapi.getMergeData(this.props.userName, this.props.repositoryName, this.state.data.lastCursor), fetchedData);
        } else {
            this.attState(gitapi.getMergeData(this.props.userName, this.props.repositoryName, this.state.data.lastCursor), fetchedData);

            let queryChunkedData = this.state.data.nodes.map((item) => {
                return {
                    mergeTime: MathUtils.dateDiff(item.node.mergedAt, item.node.createdAt),
                    pullRequestSize: (item.node.additions + item.node.deletions)
                }
            }
            );

            let insights = this.insightGeneration(queryChunkedData);

            let newState = {
                data: this.state.data,
                insights: insights,
            };

            this.setState(newState)

            this.props.mergeDataInsightsChange(newState.insights);
        }
    }

    attState = (mergePromise, fetchedData) => {
        mergePromise.then(res => {
            fetchedData = res.data.data.user ? res.data.data.user : res.data.data.organization;

            if (fetchedData && fetchedData.repositories) {
                let pullRequests = fetchedData.repositories.pullRequests;
                let nodeArrayConcatenated = utils.concatNodeArray(pullRequests.edges);

                if (pullRequests.edges.length > 0) {
                    let newState = {
                        data: {
                            lastCursor: pullRequests.pageInfo.endCursor,
                            totalCount: pullRequests.totalCount,
                            nodes: nodeArrayConcatenated
                        }
                    };
                    this.setState(newState, () => {
                        this.fillStateByFetching(fetchedData);
                    });
                }

            } else {
                this.setState(initialState);
                this.props.mergeDataInsightsChange(initialState.insights);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repositoryName !== nextProps.repositoryName && nextProps.userName && nextProps.repositoryName) {
            let fetchedData = {
                repositories: null
            };

            this.setState(initialState, () => {
                this.attState(gitapi.getMergeData(nextProps.userName, nextProps.repositoryName, this.state.data.lastCursor), fetchedData);
            });

        }
    }

    render() {

        return (
            <SimpleInfoCard cardTitle={this.state.cardTitle} cardValue={this.state.value} />
        );
    }
}
export default enhance(PullRequestTimeCard);