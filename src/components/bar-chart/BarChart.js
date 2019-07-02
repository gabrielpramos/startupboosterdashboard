import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-style';
import ChartSettings from '../../utils/ChartSettings';

class BarChart extends Component {

    constructor() {
        super();
        this.chartRef = React.createRef();
        this.state = {
            _chartContainer: document.getElementById('mergeChart'),
            _chartAttr: ChartSettings.Bar,
        }

    }

    eventHandler() {
        this.chartRef.current.chartInstance.data.datasets[0].data = [32, 33, 8];
        this.chartRef.current.chartInstance.update();
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

export default BarChart;