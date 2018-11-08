import React from 'react';

function LogWithProps (WrappedComponent) {
    return function LogWithProps({data, iterator}) {

        let styles = {};

        const giveNewProps = () => {
            if (iterator === 0) {
                styles = {
                    styles: {backgroundColor: "#b287a1", width: "1014px", height: " 250px", margin: "0px", textAlign: "left"},
                    displayImg: "none",
                    displayBody: "block",
                    displayButton: "inline-block",
                    titleHeight: "40px"
                };
            } else if (iterator > 0 && iterator < 3) {
                styles = {
                    styles: {backgroundColor: "#d1b1c4", width: "490px", margin: "6px", height: "350px", float: "left", textAlign: "left"},
                    displayImg: "none",
                    displayBody: "block",
                    displayButton: "inline-block",
                    titleHeight: "40px"
                };
            };
        };
        giveNewProps();

        return(
            <WrappedComponent data={data} iterator={iterator} {...styles}/>
        );
    };
};

export default LogWithProps;