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
import './MonthSummaryPanel.css';

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
    },
    tabIndex: 0,
};

const title = 'Month Summary';

export class MonthSummaryPanel extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.today = moment();
        this.lastMonth = moment(this.today).subtract(1, 'months');
    }

    nodeFillingCondition() {
        let isBetween = this.state.pullRequests.data.nodes.filter((pullRequest) => { return moment(pullRequest.node.createdAt).isBetween(this.lastMonth, this.today) }).length === this.state.pullRequests.data.nodes.length;
        return isBetween && this.state.pullRequests.data.totalCount < this.state.pullRequests.data.nodes.length;
    }

    queryDataInsightGeneration = (queryChunkedPullRequestsData, totalCountRef, averageMarker, insights) => {

        if (queryChunkedPullRequestsData.length === 0) {
            return insights;
        }

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

        insights.average = Math.round(totalCountRef.totalCount / quantity);
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


            let prInsightsObj = { average: 0, opened: {}, closed: {}, merged: {} };

            let pullRequestsInsights = this.queryDataInsightGeneration(queryChunkedPullRequestsData, this.state.pullRequests.data, 'merged', prInsightsObj);


            let issuesInsightsObj = { average: 0, opened: {}, closed: {} };

            let issuesInsights = this.queryDataInsightGeneration(queryChunkedIssuesData, this.state.issues.data, 'opened', issuesInsightsObj);

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

        if ((this.props.repositoryName !== nextProps.repositoryName || this.props.userName !== nextProps.userName) && nextProps.userName && nextProps.repositoryName) {

            this.setState(initialState, () => {
                this.attState(gitapi.getMonthSummaryData(this.props.userName, this.props.repositoryName, this.state.pullRequests.data.lastCursor, this.state.issues.data.lastCursor));
            });

        }
    }

    onSelectHandler = index => {
        this.setState({
            pullRequests: this.state.pullRequests,
            issues: this.state.issues,
            tabIndex: index
        });
    }

    render() {
        return (
            <Card className="box-card row-presentation"
                header={
                    < div className="clearfix" >
                        <span style={{ "lineHeight": "36px" }}>{title}</span>
                    </div>
                }>
                < Menu defaultActive="0" className="el-menu-demo" mode="horizontal" onSelect={this.onSelectHandler.bind(this)}>
                    <Menu.Item index="0">
                        <SimpleInfoMenuItem itemHeader={'Pull Requests'} itemBody={this.state.pullRequests.insights.average} />
                    </Menu.Item>
                    <Menu.Item index="1">
                        <SimpleInfoMenuItem itemHeader={'Issues'} itemBody={this.state.issues.insights.average} />
                    </Menu.Item>
                </Menu>
                <LineChart insightTarget={parseInt(this.state.tabIndex, 10) === 0 ? 'pullRequests' : 'issues'} />
            </Card >

        );
    }
}
export default enhance(MonthSummaryPanel);