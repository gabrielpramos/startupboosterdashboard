import React, { Component } from 'react';
import gitapi from '../../services/service';
import { Card } from 'element-react';
import BarChart from '../bar-chart/BarChart';
import { mergeQueryChange } from '../../actions';
import './MergeGraphCard.css';
import * as moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value,
    mergeQueryState: store.mergeQueryState.value,

})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ mergeQueryChange }, dispatch);

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
        mergeTimeAverage: 0,
        pullRequestSize: '',
    }
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

    attState = (mergePromise, fetchedData) => {
        mergePromise.then(res => {
            fetchedData = res.data.data.user ? res.data.data.user : res.data.data.organization;

            if (fetchedData.repositories) {
                let pullRequests = fetchedData.repositories.pullRequests;
                let nodeArrayConcatnated = this.concatNodeArray(pullRequests.edges);

                if (pullRequests.edges.length > 0) {
                    this.props.mergeQueryChange({
                        data: {
                            lastCursor: pullRequests.edges[pullRequests.edges.length - 1].cursor,
                            totalCount: pullRequests.totalCount,
                            nodes: nodeArrayConcatnated
                        }
                    });
                    this.setState({
                        data: {
                            lastCursor: pullRequests.edges[pullRequests.edges.length - 1].cursor,
                            totalCount: pullRequests.totalCount,
                            nodes: nodeArrayConcatnated
                        }
                    }, () => {
                        if (this.state.data.nodes.length <= this.state.data.totalCount) {
                            this.attState(gitapi.getMerge(this.props.userName, this.props.repositoryName, this.state.data.lastCursor), fetchedData);
                            console.log(this.state.data);
                            console.log(this.state.data.nodes.map((item) => {
                                return {
                                    mergeTime: moment(item.node.mergedAt).diff(moment(item.node.createdAt), 'minutes'),
                                    pullRequestSize: (item.node.additions + item.node.deletions)
                                }
                            }
                            ));
                        }
                    });
                }

            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repositoryName !== nextProps.repositoryName && nextProps.repositoryName) {
            let fetchedData = {
                repositories: null
            };

            this.setState(initialState, () => {
                this.attState(gitapi.getMerge(nextProps.userName, nextProps.repositoryName, this.state.data.lastCursor), fetchedData);
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