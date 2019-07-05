import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-style';
import ChartSettings from '../../utils/ChartSettings';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './LineChart.css';
import * as moment from 'moment';

const mapStateToProps = store => ({
    monthSummaryState: store.monthSummaryState.value,

})

const enhance = compose(
    connect(mapStateToProps)
);

const PRESENTATION_LIMIT_DAYS = 30;

class LineChart extends Component {

    constructor() {
        super();
        this.chartRef = React.createRef();
        this.pullsRequestsArray = []
        this.state = {
            _chartAttr: ChartSettings.Line(this.callbackFunction),
        }

        this.days = [moment().subtract(1, 'months')];
        this.values = new Array(PRESENTATION_LIMIT_DAYS).fill(0);
        this.newInsightTarget = '';
    }

    componentDidMount() {
        if (this.days) {
            let auxCurrDate = this.days[0];
            for (var i = 0; i < PRESENTATION_LIMIT_DAYS; i++) {
                auxCurrDate = moment(auxCurrDate).add(1, 'days');
                this.days.push(auxCurrDate)
            }

            this.chartRef.current.chartInstance.data.labels = this.days.map((day) => { return day.format('DD MMM') })
            this.chartRef.current.chartInstance.update();
        }
    }

    fillChartValues = (newData, objectsQuantity) => {
        if (this.chartRef.current.chartInstance.data.datasets.length < objectsQuantity.length) {
            this.chartRef.current.chartInstance.data.datasets.push(ChartSettings.lineTemplateDataset);
        } else if (this.chartRef.current.chartInstance.data.datasets.length > objectsQuantity.length) {
            this.chartRef.current.chartInstance.data.datasets = this.chartRef.current.chartInstance.data.datasets.filter((dataset) => {
                return dataset.label !== 'merged';
            });
        }
        objectsQuantity.forEach((insight, index) => {
            this.chartRef.current.chartInstance.data.labels.forEach((date, indexLabel) => {

                Object.keys(newData[insight]).forEach((day) => {

                    let prepareDate = `${day.split('/').reverse().join('-')}`;

                    if (moment(prepareDate).format('DD MMM') === date) {
                        this.values[indexLabel] = newData[insight][day];
                    }
                })

            });


            this.chartRef.current.chartInstance.data.datasets[index].label = insight
            this.chartRef.current.chartInstance.data.datasets[index].data = this.values;
            this.values = new Array(PRESENTATION_LIMIT_DAYS).fill(0);
        });

        this.chartRef.current.chartInstance.update();
    }

    updateChart(insights) {
        let newData = insights.value[this.newInsightTarget].insights;

        let objectsQuantity = Object.keys(newData).filter((insight) => { return insight !== 'average' });

        this.fillChartValues(newData, objectsQuantity);

    }

    componentWillReceiveProps(nextProps) {
        let insights = nextProps.monthSummaryState;
        this.newInsightTarget = nextProps.insightTarget;
        if (insights && this.props !== nextProps) {
            this.updateChart(insights);
        }
    }

    render() {
        const {
            data,
            options,
        } = this.state._chartAttr;

        return (<Line
            ref={this.chartRef}
            id={`${this.newInsightTarget}Chart`}
            data={data}
            width={600}
            height={400}
            options={options}></Line>);
    }
}
export default enhance(LineChart);