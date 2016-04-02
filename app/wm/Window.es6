export default class Window {
    constructor(id) {
        this.id = id;
    }

    renderTo($target) {
        this.$target = $target;
        $target.html('render ' + this.id)
    }

    dispose() {
        console.log('dispose '+this.id)
        this.$target.html('dispose ' + this.id)
    }
}