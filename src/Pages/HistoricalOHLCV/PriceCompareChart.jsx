import React from 'react';
import Chart from 'chart.js'

export class PriceCompareChart extends React.Component {
    constructor() {
        super();
        this.chart = undefined;
    }

    createChart = () => {
        const ctx = document.getElementById('PriceCompareChart');
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.props.labels,
                datasets: this.props.datasets
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false,
                            autoSkip: false,
                            maxRotation: 80,
                            minRotation: 80
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Price Compare Chart'
                }
            }
        });
        return this.chart;
    };

    componentDidMount() {
        this.createChart();
    }

    componentWillReceiveProps() {
        console.log (this.props.labels);
        console.log (this.props.datasets);
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
                <canvas id="PriceCompareChart" width="400" height="400"></canvas>
            </div>
        );
    };
};