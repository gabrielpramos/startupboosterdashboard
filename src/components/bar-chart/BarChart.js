import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-style';
import ChartSettings from '../../utils/ChartSettings';
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


class BarChart extends Component {

    constructor() {
        super();
        this.chartRef = React.createRef();
        this.pullsRequestsArray = []
        this.callbackFunction = (index) => {
            return `Pull requests ${this.pullsRequestsArray[index]}`;
        };
        this.state = {
            _chartContainer: document.getElementById('mergeChart'),
            _chartAttr: ChartSettings.Bar(this.callbackFunction),
        }

    }

    updateChart(insights) {
        let newData = [insights.small, insights.medium, insights.large];
        this.chartRef.current.chartInstance.data.datasets[0].data = newData.map((insightRecord) => { return insightRecord.average });
        this.pullsRequestsArray = newData.map((insightRecord) => { return insightRecord.pullRequests });
        this.chartRef.current.chartInstance.update();

    }

    componentWillReceiveProps(nextProps) {
        let insights = nextProps.mergeDataInsightsState;
        if (insights && this.props.mergeDataInsightsState !== nextProps.mergeDataInsightsState) {
            this.updateChart(insights);
        }
    }

    render() {

        const {
            data,
            options,
        } = this.state._chartAttr;

        return (
            <Bar
                ref={this.chartRef}
                id="mergeChart"
                data={data}
                width={100}
                height={450}
                options={options}
            />
        );
    }
}

export default enhance(BarChart);;