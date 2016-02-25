import * as React from 'react';
import * as ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    hello(){
        console.log(this.props.name);
    }
    render() {
        return <div onClick={::this.hello}>Hello {this.props.name}</div>;
    }
}

export function show() {
    let elementById = document.getElementById("workspaceReact");
    console.log('elementById: ');
    console.log(elementById);
    ReactDOM.render(<HelloMessage name="Sebastian"/>, elementById);
}