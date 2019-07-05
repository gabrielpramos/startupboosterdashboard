import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import utils from '../../utils/utils';
import gitapi from '../../services/service';
import { Card, Menu } from 'element-react';
import SimpleInfoMenuItem from '../simple-info-menu-item/SimpleInfoMenuItem';
import { monthSummaryInsightsChange } from '../../actions'
import * as moment from 'moment';
import LineChart from '../line-chart/LineChart';

const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ monthSummaryInsightsChange }, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

const initialState = {
    pullRequests: {
        data:
        {
            lastCursor: null,
            totalCount: 0,
            nodes: [],
        },
        insights: { average: 0, opened: {}, closed: {}, merged: {} },

    },
    issues: {
        data:
        {
            lastCursor: null,
            totalCount: 0,
            nodes: [],
        },
        insights: { average: 0, opened: {}, closed: {} },
    }

};

const title = 'Month Summary';

export class MonthSummaryPanel extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    nodeFillingCondition() {
        return this.state.pullRequests.data.nodes.length < this.state.pullRequests.datatotalCount && this.state.issues.data.nodes.length < this.state.issues.datatotalCount;
    }

    queryDataInsightGeneration = (queryChunkedPullRequestsData, totalCountRef, averageMarker) => {
        let insights = { average: 0, opened: {}, closed: {}, merged: {} };

        let queryChunkedPullRequestsDataAux = Object.assign([], queryChunkedPullRequestsData);
        let status = Object.keys(queryChunkedPullRequestsDataAux[0]);
        let daysByStatus = {};

        status.forEach((status) => {
            daysByStatus[status] = {};
        });

        queryChunkedPullRequestsDataAux.forEach((pullRequest) => {
            status.forEach((status) => {
                daysByStatus[status][pullRequest[status]] ? daysByStatus[status][pullRequest[status]]++ : daysByStatus[status][pullRequest[status]] = 1;
            });
        });

        let quantity = Object.keys(daysByStatus[averageMarker]).length;

        insights.average = totalCountRef.totalCount / quantity;
        status.forEach((status) => {
            insights[status] = daysByStatus[status];
        })

        return insights;
    }

    fillStateByFetching = () => {
        if (this.nodeFillingCondition()) {
            this.attState(gitapi.getMonthSummaryData(this.props.userName, this.props.repositoryName, this.state.pullRequests.data.lastCursor, this.state.issues.data.lastCursor));
        } else {
            this.attState(gitapi.getMonthSummaryData(this.props.userName, this.props.repositoryName, this.state.pullRequests.data.lastCursor, this.state.issues.data.lastCursor));

            let queryChunkedPullRequestsData = this.state.pullRequests.data.nodes.map((item) => {
                return { merged: moment(item.node.mergedAt).format('DD/MM'), opened: moment(item.node.createdAt).format('DD/MM'), closed: moment(item.node.closedAt).format('DD/MM') }
            });

            let queryChunkedIssuesData = this.state.issues.data.nodes.map((item) => {
                return { opened: moment(item.node.createdAt).format('DD/MM'), closed: moment(item.node.closedAt).format('DD/MM') }
            });

            let pullRequestsInsights = this.queryDataInsightGeneration(queryChunkedPullRequestsData, this.state.pullRequests.data, 'merged');

            let issuesInsights = this.queryDataInsightGeneration(queryChunkedIssuesData, this.state.issues.data, 'opened');

            let newState = {
                pullRequests: {
                    data: this.state.pullRequests.data,
                    insights: pullRequestsInsights,
                },
                issues: {
                    data: this.state.issues.data,
                    insights: issuesInsights,
                }
            };

            this.setState(newState)

            this.props.monthSummaryInsightsChange(newState);
        }
    }

    attState = (issuesPromise) => {
        issuesPromise.then(res => {
            let fetchedData = res.data.data.user ? res.data.data.user : res.data.data.organization;

            if (fetchedData && fetchedData.repositories && (fetchedData.repositories.issues || fetchedData.repositories.pullRequests)) {

                let pullRequests = fetchedData.repositories.pullRequests;
                let pullRequestsNodeArrayConcat = utils.concatNodeArray(this.state.pullRequests.data.nodes, pullRequests.edges);

                let issues = fetchedData.repositories.issues;
                let issuesNodeArrayConcat = utils.concatNodeArray(this.state.issues.data.nodes, issues.edges);

                if (pullRequests.edges.length > 0 || issues.edges.length > 0) {
                    let newState = {
                        pullRequests: {
                            data:
                            {
                                lastCursor: pullRequests.pageInfo.endCursor,
                                totalCount: pullRequests.totalCount,
                                nodes: pullRequestsNodeArrayConcat
                            },
                            insights: { average: 0 },

                        },
                        issues: {
                            data:
                            {
                                lastCursor: issues.pageInfo.endCursor,
                                totalCount: issues.totalCount,
                                nodes: issuesNodeArrayConcat
                            },
                            insights: { average: 0 },
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
                this.attState(gitapi.getMonthSummaryData(this.props.userName, this.props.repositoryName, this.state.pullRequests.data.lastCursor, this.state.issues.data.lastCursor));
            });

        }
    }

    onSelectHandler = index => {
        console.log(index);
    }

    render() {
        return (
            <Card className="box-card row-presentation"
                header={
                    <div className="clearfix">
                        <span style={{ "lineHeight": "36px" }}>{title}</span>
                    </div>
                }>
                < Menu defaultActive="0" className="el-menu-demo" mode="horizontal" onSelect={this.onSelectHandler.bind(this)}>
                    <Menu.Item index="0">
                        <SimpleInfoMenuItem itemHeader={'Pull Requests'} itemBody={'38'} />
                    </Menu.Item>
                    <Menu.Item index="1">
                        <SimpleInfoMenuItem itemHeader={'Issues'} itemBody={'60'} />
                    </Menu.Item>
                </Menu>
                <LineChart />
            </Card >

        );
    }
}
export default enhance(MonthSummaryPanel);