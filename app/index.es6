import ModalWindow from './jug/EventBus';
import ModalWindowES6 from './jug/EventBusES6';
import ModalWindowTs from './jug/EventBusTs';
import TabWindowManager from  './wm/TabWindowManager'
import WindowManager from  './wm/WindowManager'
import ComposableWindow from  './wm/ComposableWindow'
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
var composableWindow = new ComposableWindow('DocumentWindow',new Window('composibiotnCustomer'));

var windowManager = new TabWindowManager("#windows");
windowManager.init();
windowManager.show(customerWindow);
windowManager.show(operatorWindow);
windowManager.show(composableWindow);
windowManager.show(customerWindow);


composableWindow.windowManager.show(new Window('composibiotnOperaotr'))
composableWindow.windowManager.show(new Window('composibiotnDocument'))
composableWindow.windowManager.show(new Window('composibiotnOperator'))

