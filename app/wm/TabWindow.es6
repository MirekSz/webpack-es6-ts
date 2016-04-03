import WindowManager from './WindowManager';
import Window from './Window';
import BaseWindow from './BaseWindow';
export default class TabWindow extends BaseWindow{
    constructor(id) {
       super(id);
    }

    renderToImpl($target) {
        $target.html(`<div id="embedded_${this.id}">Render to ${this.id}</div>`);
        this.windowManager = new WindowManager(`#embedded_${this.id}`);

        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');
        var documentWindow = new Window('DocumentWindow');

        this.windowManager.init();
        this.windowManager.show(customerWindow);
        this.windowManager.show(operatorWindow);
        this.windowManager.show(documentWindow);
        this.windowManager.show(customerWindow);
        
    }

    disposeImpl() {
        this.windowManager.dispose();
    }
    
    visibleChangeImpl(value) {
        this.windowManager.visibleChange(value);
    }
}