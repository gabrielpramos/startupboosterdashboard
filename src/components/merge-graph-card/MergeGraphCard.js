import React, { Component } from 'react';
import gitapi from '../../services/service';
import { Card } from 'element-react';
import BarChart from '../bar-chart/BarChart';
import { mergeDataInsightsChange } from '../../actions';
import './MergeGraphCard.css';
import MathUtils from '../../utils/MathUtils';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value,
    mergeDataInsightsState: store.mergeDataInsightsState.value,

})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ mergeDataInsightsChange }, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

const initialState = {
    data: {
        lastCursor: null,
        totalCount: 0,
        nodes: []
    },
    insights: {
        large: { average: 0, pullRequests: 0 },
        medium: { average: 0, pullRequests: 0 },
        small: { average: 0, pullRequests: 0 },
    },
}

class MergeGraphCard extends Component {

    constructor() {
        super();

        this.state = initialState;
    }

    concatNodeArray(nodeArray) {
        return this.state.data.nodes.concat(nodeArray);
    }

    nodeFillingCondition() {
        return this.state.data.nodes.length < this.state.data.totalCount;
    }

    insightGeneration = queryChunkedData => {
        let insights = {
            large: { average: 0, pullRequests: 0 },
            medium: { average: 0, pullRequests: 0 },
            small: { average: 0, pullRequests: 0 },
        };

        let smallSizeMergeTimeArray = queryChunkedData.filter((mergeInfo) => { return mergeInfo.pullRequestSize <= 100 }).map((mergeInfoArray) => { return mergeInfoArray.mergeTime });
        insights.small = {
            average: MathUtils.average(smallSizeMergeTimeArray),
            pullRequests: smallSizeMergeTimeArray.length
        };

        let mediumSizeMergeTimeArray = queryChunkedData.filter((mergeInfo) => { return mergeInfo.pullRequestSize <= 1000 && mergeInfo.pullRequestSize > 100 }).map((mergeInfoArray) => { return mergeInfoArray.mergeTime });
        insights.medium = {
            average: MathUtils.average(mediumSizeMergeTimeArray),
            pullRequests: mediumSizeMergeTimeArray.length,
        };

        let largeSizeMergeTimeArray = queryChunkedData.filter((mergeInfo) => { return mergeInfo.pullRequestSize > 1000 }).map((mergeInfoArray) => { return mergeInfoArray.mergeTime });
        insights.large = {
            average: MathUtils.average(largeSizeMergeTimeArray),
            pullRequests: largeSizeMergeTimeArray.length,
        };

        return insights;
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

            console.log(insights);

        }
    }

    attState = (mergePromise, fetchedData) => {
        mergePromise.then(res => {
            fetchedData = res.data.data.user ? res.data.data.user : res.data.data.organization;

            if (fetchedData.repositories) {
                let pullRequests = fetchedData.repositories.pullRequests;
                let nodeArrayConcatnated = this.concatNodeArray(pullRequests.edges);

                if (pullRequests.edges.length > 0) {
                    let newState = {
                        data: {
                            lastCursor: pullRequests.edges[pullRequests.edges.length - 1].cursor,
                            totalCount: pullRequests.totalCount,
                            nodes: nodeArrayConcatnated
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
        if (this.props.repositoryName !== nextProps.repositoryName && nextProps.repositoryName) {
            let fetchedData = {
                repositories: null
            };

            this.setState(initialState, () => {
                this.attState(gitapi.getMergeData(nextProps.userName, nextProps.repositoryName, this.state.data.lastCursor), fetchedData);
            });

        }
    }

    render() {

        const lineHeight = { "lineHeight": "36px" };

        return (
            <Card
                className="box-card"
                header={
                    <div className="clearfix">
                        <span style={lineHeight}>Average Merge Time by Pull Request Size</span>
                    </div>
                }>
                <BarChart />
            </Card>
        );
    };
}
export default enhance(MergeGraphCard);