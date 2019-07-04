import React, { Component } from 'react';
import SimpleInfoCard from '../simple-info-card/SimpleInfoCard';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import utils from '../../utils/utils';
import gitapi from '../../services/service';
import { pullRequestDataInsightsChange } from '../../actions';
import DateUtils from '../../utils/DateUtils';

const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value,
    mergeDataInsightsState: store.mergeDataInsightsState.value,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ pullRequestDataInsightsChange }, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

const initialState = {
    data: {
        lastCursor: null,
        totalCount: 0,
        nodes: []
    },
    insights: { average: 0 },
}

class PullRequestTimeCard extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    nodeFillingCondition() {
        return this.state.data.nodes.length < this.state.data.totalCount;
    }

    sumAttributeByName = (obj, acc, curr) => {
        return (unitStr) => {
            if (obj.mergeTime) {
                obj.mergeTime[unitStr] = acc.mergeTime[unitStr] + curr.mergeTime[unitStr];
            }
        }
    }
    reduceMergeTimeArray = timeUnits => {
        return (acc, curr) => {
            let obj = Object.assign({}, acc);
            if (obj) {
                timeUnits.forEach(this.sumAttributeByName(obj, acc, curr))
            }
            return obj;
        }
    }

    insightGeneration = queryChunkedData => {
        let insights = { average: '' };

        let queryChunkedDataAux = queryChunkedData;

        let timeUnits = Object.keys(queryChunkedData[0].mergeTime);

        let queryData = queryChunkedDataAux.reduce(this.reduceMergeTimeArray(timeUnits));
        timeUnits.forEach((timeUnit) => {
            queryData.mergeTime[timeUnit] = Math.round(queryData.mergeTime[timeUnit] / queryChunkedData.length);
        });

        insights.average = queryData.mergeTime;

        return insights;
    }

    fillStateByFetching = (fetchedData) => {
        if (this.nodeFillingCondition()) {
            this.attState(gitapi.getMergeData(this.props.userName, this.props.repositoryName, this.state.data.lastCursor), fetchedData);
        } else {
            this.attState(gitapi.getMergeData(this.props.userName, this.props.repositoryName, this.state.data.lastCursor), fetchedData);

            let queryChunkedData = this.state.data.nodes.map((item) => {
                return {
                    mergeTime: DateUtils.dateDetailedDiff(item.node.mergedAt, item.node.createdAt),
                }
            }
            );

            let insights = this.insightGeneration(queryChunkedData);

            let newState = {
                data: this.state.data,
                insights: insights,
            };

            this.setState(newState)

            this.props.pullRequestDataInsightsChange(newState.insights);
        }
    }

    attState = (mergePromise, fetchedData) => {
        mergePromise.then(res => {
            fetchedData = res.data.data.user ? res.data.data.user : res.data.data.organization;

            if (fetchedData && fetchedData.repositories) {
                let pullRequests = fetchedData.repositories.pullRequests;
                let nodeArrayConcatenated = utils.concatNodeArray(this.state.data.nodes, pullRequests.edges);

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
                this.props.pullRequestDataInsightsChange(initialState.insights);
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
        const title = 'Average Pull Request Merge Time';
        let average = this.state.insights.average;
        const cardValue = `${DateUtils.humanizeTime(average.days, 'days', 'day')} ${DateUtils.humanizeTime(average.hours, 'hours', false, 'h')}${DateUtils.humanizeTime(average.minutes, 'minutes', false, 'm')}`;

        return (
            <SimpleInfoCard cardTitle={title} cardValue={cardValue} />
        );
    }
}
export default enhance(PullRequestTimeCard);