import React, { Component } from 'react';
import SimpleInfoCard from '../simple-info-card/SimpleInfoCard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import utils from '../../utils/utils';
import gitapi from '../../services/service';
import DateUtils from '../../utils/DateUtils';


const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value,
})

const enhance = compose(
    connect(mapStateToProps)
);

const initialState = {
    data: {
        lastCursor: null,
        totalCount: 0,
        nodes: []
    },
    insights: { average: 0 },
}

class IssueTimeCard extends Component {
    constructor() {
        super();
        this.state = initialState;
        this.title = 'Average Issue Close Time';
    }

    nodeFillingCondition() {
        return this.state.data.nodes.length < this.state.data.totalCount;
    }

    sumAttributeByName = (obj, acc, curr) => {
        return (unitStr) => {
            if (obj.issueCloseTime) {
                obj.issueCloseTime[unitStr] = acc.issueCloseTime[unitStr] + curr.issueCloseTime[unitStr];
            }
        }
    }
    reduceIssueCloseTimeArray = timeUnits => {
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

        let timeUnits = Object.keys(queryChunkedData[0].issueCloseTime);

        let queryData = queryChunkedDataAux.reduce(this.reduceIssueCloseTimeArray(timeUnits));
        timeUnits.forEach((timeUnit) => {
            queryData.issueCloseTime[timeUnit] = Math.round(queryData.issueCloseTime[timeUnit] / queryChunkedData.length);
        });

        insights.average = queryData.issueCloseTime;

        return insights;
    }

    fillStateByFetching = () => {
        if (this.nodeFillingCondition()) {
            this.attState(gitapi.getIssueData(this.props.userName, this.props.repositoryName, this.state.data.lastCursor));
        } else {
            this.attState(gitapi.getIssueData(this.props.userName, this.props.repositoryName, this.state.data.lastCursor));

            let queryChunkedData = this.state.data.nodes.map((item) => {
                return {
                    issueCloseTime: DateUtils.dateDetailedDiff(item.node.closedAt, item.node.createdAt),
                }
            }
            );

            let insights = this.insightGeneration(queryChunkedData);

            let newState = {
                data: this.state.data,
                insights: insights,
            };

            this.setState(newState);
        }
    }

    attState = (issuesPromise) => {
        issuesPromise.then(res => {
            let fetchedData = res.data.data.user ? res.data.data.user : res.data.data.organization;

            if (fetchedData && fetchedData.repositories) {
                let issues = fetchedData.repositories.issues;
                let nodeArrayConcatenated = utils.concatNodeArray(this.state.data.nodes, issues.edges);

                if (issues.edges.length > 0) {
                    let newState = {
                        data: {
                            lastCursor: issues.pageInfo.endCursor,
                            totalCount: issues.totalCount,
                            nodes: nodeArrayConcatenated
                        }
                    };
                    this.setState(newState, () => {
                        this.fillStateByFetching();
                    });
                }

            } else {
                this.setState(initialState);
            }
        });
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.repositoryName !== nextProps.repositoryName && nextProps.userName && nextProps.repositoryName) {

            this.setState(initialState, () => {
                this.attState(gitapi.getIssueData(nextProps.userName, nextProps.repositoryName, this.state.data.lastCursor));
            });

        }
    }

    render() {

        let average = this.state.insights.average;
        let cardValue = '';
        if (this.state.insights.average !== undefined) {
            cardValue = `${DateUtils.humanizeTime(average.days, 'days', 'day')} ${DateUtils.humanizeTime(average.hours, 'hours', false, 'h')}${DateUtils.humanizeTime(average.minutes, 'minutes', false, 'm')}`;
        } else {
            cardValue = 'There are no issues to show';
        }

        return (
            <SimpleInfoCard cardTitle={this.title} cardValue={cardValue} />
        );
    }
}

export default enhance(IssueTimeCard);