window.Chart.Tooltip.positioners.custom = function (elements, eventPosition) {

    return {
        x: eventPosition.x,
        y: eventPosition.y
    };
}

export default {
    lineTemplateDataset: {
        label: 'merged',
        backgroundColor: '#b20bff',
        data: [],
        fill: false,
        borderColor: '#b20bff',
        borderWidth: 2,
        pointRadius: 1,
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBackgroundColor: '#b20bff',
        pointHoverBorderColor: 'rgb(0, 0, 0, 0)'
    },
    Bar(callbackFunction) {
        return {
            type: 'bar',
            data: {
                labels: ["Small", "Medium", "Large"],
                datasets: [{
                    backgroundColor: '#4b9bff',
                    data: [],

                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                },
                tooltips: {
                    position: 'custom',
                    callbacks: {
                        title: function () {
                            return ' ';
                        },
                        label: function (tooltipItem, data) {
                            return `Average Time    ${data['datasets'][0]['data'][tooltipItem['index']]}h`;
                        },
                        afterLabel: function (tooltipItem, data) {

                            return callbackFunction(tooltipItem['index']);

                        },
                        footer: function () {
                            return ' ';
                        }
                    },
                    backgroundColor: '#FFF',
                    titleFontColor: '#0066ff',
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    cornerRadius: 3,
                    displayColors: false,
                    titleFontSize: 5,
                    footerFontSize: 5,
                    bodySpacing: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 5,
                    shadowSpread: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.1)'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 48,
                            min: 0,
                            stepSize: 8,
                            padding: 15,
                            callback: function (value, index, values) {
                                return `${value}h`;
                            },

                        },
                        gridLines: {
                            display: true,
                            borderDash: [2, 3],
                            drawTicks: false,
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }]
                }
            }
        }
    },
    Line(callbackFunction) {
        return {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'opened',
                    backgroundColor: '#13c600',
                    data: [],
                    fill: false,
                    borderColor: '#13c600',
                    borderWidth: 2,
                    pointRadius: 1,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                    pointHoverBackgroundColor: '#13c600',
                    pointHoverBorderColor: 'rgb(0, 0, 0, 0)'
                },
                {

                    label: 'closed',
                    backgroundColor: '#ff3a00',
                    data: [],
                    fill: false,
                    borderColor: '#ff3a00',
                    borderWidth: 2,
                    pointRadius: 1,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                    pointHoverBackgroundColor: '#ff3a00',
                    pointHoverBorderColor: 'rgb(0, 0, 0, 0)'
                },
                {
                    label: 'merged',
                    backgroundColor: '#b20bff',
                    data: [],
                    fill: false,
                    borderColor: '#b20bff',
                    borderWidth: 2,
                    pointRadius: 1,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                    pointHoverBackgroundColor: '#b20bff',
                    pointHoverBorderColor: 'rgb(0, 0, 0, 0)'
                }
                ]
            },
            options: {
                maintainAspectRatio: true,
                responsive: true,
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                    }
                },
                elements: {
                    line: {
                        tension: 0,
                        bezierCurve: false,
                    }
                },
                hover: {
                    intersect: false,
                },
                tooltips: {
                    callbacks: {
                        title: function () {
                            return ' ';
                        },
                        label: function (tooltipItem, data) {
                            return `  ${data['datasets'][tooltipItem.datasetIndex]['label']}    ${data['datasets'][tooltipItem.datasetIndex]['data'][tooltipItem['index']]}`;
                        },
                        footer: function () {
                            return ' ';
                        }
                    },
                    backgroundColor: '#FFF',
                    titleFontColor: '#0066ff',
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    cornerRadius: 3,
                    titleFontSize: 5,
                    footerFontSize: 5,
                    bodySpacing: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 5,
                    shadowSpread: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 25,
                            padding: 15,
                            callback: function (value, index, values) {
                                return `${value}h`;
                            },

                        },
                        gridLines: {
                            display: true,
                            borderDash: [2, 3],
                            drawTicks: false,
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                        }
                    }]
                }
            }
        }
    }
}