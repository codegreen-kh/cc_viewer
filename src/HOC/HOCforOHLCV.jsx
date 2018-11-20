import React from 'react';

function HOCforOHLCV (WrappedComponent) {
    return function HOCforOHLCV ({...data}) {
        const [id] = data.id;
        const [value] = data.value;
        const dataFromSelector = data.dataFromSelector;
        const period = data.period;
        let styles = {};

        if (id === period) {
            styles = {
                backgroundColor: '#D77A61',
                color: 'black'
            }
        } else {
            styles = {
                backgroundColor: '#018786'
            }
        }

        return(
            <WrappedComponent id={id} value={value} dataFromSelector={dataFromSelector} styles={styles}/>
        );
    };
};

export default HOCforOHLCV;