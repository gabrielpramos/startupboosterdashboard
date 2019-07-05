import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-style';
import ChartSettings from '../../utils/ChartSettings';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = store => ({
    mergeDataInsightsState: store.monthSummaryState.value,

})

const enhance = compose(
    connect(mapStateToProps)
);

class LineChart extends Component {
    
    render() {
        const {
            data,
            options,
        } = this.state._chartAttr;

        return (<Line
            ref={this.chartRef}
            id="monthSummaryChart"
            data={data}
            width={100}
            height={450}
            options={options}></Line>);
    }
}
export default enhance(LineChart);