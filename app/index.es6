import ModalWindow from './jug/EventBus';
import ModalWindowES6 from './jug/EventBusES6';
import ModalWindowTs from './jug/EventBusTs';
import TabWindowManager from  './wm/TabWindowManager'
import WindowManager from  './wm/WindowManager'
import Window from  './wm/Window'
// setTimeout(function () {
//     require.ensure([], () => {
//         var {showTable} = require('./table/Sample');
//         global.showTable=showTable;
//         showTable($("#workspace"));
//     });
// },5000);


var customerWindow = new Window('CustomerWindow');
var operatorWindow = new Window('OperatorWindow');
var documentWindow = new Window('DocumentWindow');

var windowManager = new WindowManager("windows");
windowManager.init();
windowManager.show(customerWindow);
windowManager.show(operatorWindow);
windowManager.show(documentWindow);
windowManager.show(customerWindow);

