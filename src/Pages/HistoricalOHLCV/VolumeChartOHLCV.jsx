import React from 'react';
import Chart from 'chart.js'

export class VolumeChartOHLCV extends React.Component {
    constructor() {
        super();
        this.chart = undefined;
    }

    createChart = () => {
        const ctx = document.getElementById('volumeChart');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.props.labels,
                datasets: this.props.datasets
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 80,
                            minRotation: 80
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Historical Volume OHLCV'
                }
            }
        });
        return this.chart;
    };

    componentDidMount() {
        this.createChart();
    }

    componentWillReceiveProps() {
        this.chart.data = {
            labels: this.props.labels,
            datasets: this.props.datasets
        };
        this.chart.update();
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return(
            <div>
                <canvas id="volumeChart" width="400" height="400"></canvas>
            </div>
        );
    };
};