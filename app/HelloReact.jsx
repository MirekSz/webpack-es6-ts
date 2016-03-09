import * as React from 'react';
import * as ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    constructor() {
        super();
        this.state = {clicks: 0};
    }


    hello() {
        console.log(this.props.name);
        this.setState({clicks: this.state.clicks + 1})
    }


    render() {
        return <div onClick={::this.hello}>Hello {this.props.name} {this.state.clicks}</div>;
    }
}

export function show() {
    let elementById = document.getElementById("workspaceReact");
    console.log('elementById: ');
    console.log(elementById);
    ReactDOM.render(<HelloMessage name="Sebastian"/>, elementById);
}
