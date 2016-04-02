export default class Window {
    constructor(id) {
        this.id = id;
    }

    renderTo($target) {
        this.$target = $target;
        $target.html('render ' + this.id)
    }

    dispose() {
        this.$target.html('dispose ' + this.id)
    }
}