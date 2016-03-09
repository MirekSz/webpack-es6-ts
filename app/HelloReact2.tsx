import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IAppProps {
    name: string;
    counters?: number[];
}

export class App extends React.Component<IAppProps,{clicks:number}> {
    constructor() {
        super();
        this.state = {clicks: 0};
    }

    public hello() {
        this.setState({clicks: this.state.clicks + 1})
    }

    public render():React.ReactElement<{}> {
        return (<div onClick={this.hello.bind(this)}>Hello {this.props.name} {this.state.clicks}</div>);
    }
}

export function show2() {
    let elementById = document.getElementById("workspaceReact2");
    ReactDOM.render(<App name="Sebastian"/>, elementById);
}
