import React from 'react';
import HOCforOHLCV from "../../HOC/HOCforOHLCV";
import './Selector.sass';

class Selector extends React.Component{

    dataFromSelector = () => {
        this.props.dataFromSelector(this.props.id);
    };

    render() {
        return(
            <div className="TimeIntervalSelector__interval" style={this.props.styles} id={this.props.id} onClick={this.dataFromSelector}>{this.props.value}</div>
        );
    };
};

export default HOCforOHLCV(Selector);