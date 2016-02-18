import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IAppProps {
    name: string;
    counters?: number[];
}

export class App extends React.Component<IAppProps,{}> {
    public render():React.ReactElement<{}> {
        return (<div>Hello {this.props.name}</div>);
    }
}

export function show2() {
    let elementById = document.getElementById("workspaceReact2");
    ReactDOM.render(<App name="Sebastian"/>, elementById);
}