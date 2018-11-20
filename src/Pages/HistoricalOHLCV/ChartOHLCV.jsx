import React from 'react';
import Chart from 'chart.js'

export class ChartOHLCV extends React.Component{
    createChart = () => {
        if (this.props.data.length === 0) {
            const ctx = document.getElementById('historicalChart');
            const myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Select options and click create chart button',
                            data: []
                        }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Multiple Historical OHLCV'
                    }
                }
            });
            return myLineChart;
        } else {
            const data = this.props.data.map((item) => [{data: item.Data}, {crypto: item.crypto}, {currency: item.currency}, {period: item.period}])
            const labels = data[0][0].data.map((item) => item.time);
            const newLabels = labels.map((item) => {
                const fullDate = new Date(item * 1000);
                const date = fullDate.toLocaleDateString("en-US");
                const time = fullDate.toLocaleTimeString("en-US");
                return (`${date} ${time}`);
            });
            const datasets = data.map((item) => {
                const [crypto] = item.filter((i) => i.crypto);
                const [currency] = item.filter((i) => i.currency);
                const prices = item[0].data.map((i) => i.open);
                return ({label: `${crypto.crypto} - ${currency.currency}`, data: prices});
            });
            const ctx = document.getElementById('historicalChart');
            const myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: newLabels,
                    datasets: datasets
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
                        text: 'Multiple Historical OHLCV'
                    }
                }
            });
            return myLineChart;
        }
    };

    componentDidMount() {
        this.createChart();
    }

    componentWillReceiveProps() {
        this.createChart();
    }

    render() {
        return(
            <div>
                <canvas id="historicalChart" width="400" height="400"></canvas>
            </div>
        );
    };
};