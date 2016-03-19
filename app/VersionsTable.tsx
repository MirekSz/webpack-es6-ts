/**
 * Created by Mirek on 2016-03-01.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

enum Type{
    STANDARD,
    DEMO,
    SCHOOL,
    TEST,
    DEVELOPER
}
class VersionUpdate {
    public version:string;
    public date:Date;

    constructor(version:string, date:Date) {
        this.version = version;
        this.date = date;
    }
}
class Version {


    public license:number;
    public customerName:string;
    public type:Type;
    public history:Array<VersionUpdate> = [];

    constructor(license:number, customerName:string, type:Type) {
        this.license = license;
        this.customerName = customerName;
        this.type = type;
    }

    getHistory():Array<VersionUpdate> {
        return this.history;
    }
}

let version = new Version(1, 'KE', Type.STANDARD);

version.getHistory().push(new VersionUpdate('1', new Date()));
version.getHistory().push(new VersionUpdate('2', new Date()));
version.getHistory().push(new VersionUpdate('3', new Date()));

let version2 = new Version(2, 'ME', Type.STANDARD);

version2.getHistory().push(new VersionUpdate('2', new Date()));
version2.getHistory().push(new VersionUpdate('3', new Date()));
version2.getHistory().push(new VersionUpdate('4', new Date()));

var versions:Array<Version> = [];

versions.push(version);
versions.push(version2);

interface IAppProps {
    versions?: Array<Version>;
}

export class App extends React.Component<{},IAppProps> {
    public render():React.ReactElement<{}> {
        let any = this.state ? this.state.versions.length : '0';
        var lis = [];

        if (this.state) {
            this.state.versions.forEach((element)=> {
                var subLis = [];
                lis.push(<li>{element.customerName}</li>);
                element.getHistory().forEach((hist)=> {
                    subLis.push(<li>{hist.version} {hist.version}</li>)
                });
                lis.push(<ul>{subLis}</ul>);
            });
        }
        return (<div>Hello {any}
            <ul>{lis}</ul>
        </div>);
    }
}

export function show3() {
    let elementById = document.getElementById("workspaceReact3");
    let element:App = ReactDOM.render(<App />, elementById);
    console.log('element: ');
    console.log(element);
    element.setState({versions});
}

