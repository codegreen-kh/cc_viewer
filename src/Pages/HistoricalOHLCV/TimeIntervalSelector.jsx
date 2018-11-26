import React from 'react';
import './TimeIntervalSelector.sass';
import Selector from "./Selector";

export class TimeIntervalSelector extends React.Component {
    state = {
        periods: [{histoday: 'Daily'}, {histohour: 'Hourly'}, {histominute: 'Minute'}]
    };

    dataFromTimeIntervalSelecror = (data) => {
        if (data === undefined) {
            const data = "histoday";
            this.props.dataFromTimeIntervalSelecror(data);
        } else {
            this.props.dataFromTimeIntervalSelecror(data);
        }
    };

    getDataFromSelector = (dataFromChild) => {
        this.dataFromTimeIntervalSelecror(dataFromChild);
    }

    componentDidMount() {
        this.dataFromTimeIntervalSelecror();
    }

    render() {
        return(
            <div className="TimeIntervalSelector">
                {this.state.periods.map((item) => < Selector period={this.props.period} dataFromSelector={this.getDataFromSelector} key={Object.values(item).map((i) => i)} id={Object.keys(item).map((i) => i)} value={Object.values(item).map((i) => i)}/>)}
            </div>
        );
    };
};