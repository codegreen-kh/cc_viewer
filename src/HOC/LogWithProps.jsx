import React from 'react';

function LogWithProps (WrappedComponent) {
    return class LogWithProps extends React.Component {
        state = {
            styles: [],
            displayImg: "",
            displayBody: "",
            displayButton: ""
        };

        giveNewProps = () => {
            if (this.props.iterator === 0) {
                this.setState ({styles: {backgroundColor: "#b287a1", width: "1014px", height: " 250px", margin: "0px", textAlign: "left"}});
                this.setState ({displayImg: "none"});
                this.setState ({displayBody: "block"});
                this.setState ({displayButton: "inline-block"});
            } else if (this.props.iterator > 0 && this.props.iterator < 3) {
                this.setState ({styles: {backgroundColor: "#d1b1c4", width: "490px", margin: "6px", height: "350px", float: "left", textAlign: "left"}});
                this.setState ({displayImg: "none"});
                this.setState ({displayBody: "block"});
                this.setState ({displayButton: "inline-block"});
            }
        };

        componentWillMount() {
            this.giveNewProps();
        }

        render() {
            return <WrappedComponent {...this.props} styles={this.state.styles} displayImg={this.state.displayImg} displayBody={this.state.displayBody}
            displayButton={this.state.displayButton}/>;
        }
    };
}

export default LogWithProps;