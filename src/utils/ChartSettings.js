window.Chart.Tooltip.positioners.custom = function (elements, eventPosition) {

    return {
        x: eventPosition.x,
        y: eventPosition.y
    };
}

export default {
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
                datasets: [{
                    backgroundColor: '#4b9bff',
                    data: [10],

                },
                {
                    backgroundColor: 'red',
                    data: [10],

                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    position: 'bottom'
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
                            max: 100,
                            min: 0,
                            stepSize: 8,
                            padding: 15,
                            callback: function (value, index, values) {
                                return `${value}`;
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
                            borderDash: [2, 3],
                            drawTicks: false,
                        }
                    }]
                }
            }
        }
    }
}