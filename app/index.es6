import InputComponent from './InputComponent';
import InputComponent2 from './InputComponent2';
import Demo from './Demo';
import TableComponent from './table/TableComponent';
import TableModel from './table/TableModel';

var obj = new Demo();
let tableModel = new TableModel();
tableModel.defineColumn('name');
tableModel.defineColumn('age');
tableModel.addRow({name: 'Jan', age: 45});
tableModel.addRow({name: 'Marek', age: 35});

let tableComponent = new TableComponent();
tableComponent.bindWithModel(tableModel);

tableComponent.renderTo($("#workspace"));

module.hot.accept('./Demo', function () {
    var DemoModule = require("./Demo").default;
    var old = obj.counter;
    obj = new DemoModule();
    obj.counter = old;
});

setInterval(function () {
    document.title = obj.sayHello();
}, 2000);