import WindowManager from './WindowManager';
import Window from './Window';
import BaseWindow from './BaseWindow';
export default class ComposableWindow extends BaseWindow{
    constructor(id) {
       super(id);

    }

    renderToImpl($target) {
        this.createWorkingDiv($target);

        this.windowManager = new WindowManager(`#embedded_${this.id}`);
        this.windowManager.init();
    }

    createWorkingDiv($target) {
        $target.html(`<div id="embedded_${this.id}">Render to ${this.id}</div>`);
    }

    disposeImpl() {
        this.windowManager.dispose();
    }
    
    visibleChangeImpl(value) {
        this.windowManager.visibleChange(value);
    }
}