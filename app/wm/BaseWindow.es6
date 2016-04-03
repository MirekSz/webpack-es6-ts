export default class BaseWindow{
    constructor(id) {
        this.id = id;
    }

    renderTo($target) {
        this.$target = $target;
        this.renderToImpl($target)
    }

    dispose() {
        console.log('dispose ' + this.id)
        this.disposed = true;
        this.disposeImpl();
    }
    disposeImpl(){
        this.$target.html('dispose ' + this.id)
    }

    visibleChange(value) {
        this.visible = value;
        this.visibleChangeImpl(value);
    }

    visibleChangeImpl(value) {
        
    }

    renderToImpl($target) {
        $target.html('render ' + this.id);
    }
}