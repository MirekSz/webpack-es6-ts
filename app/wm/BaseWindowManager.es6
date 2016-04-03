export default class BaseWindowManager {
    constructor(jquerySelectorToManage) {
        /**@type {jQuery} */
        this.$sectionToManage = $(jquerySelectorToManage);
        this.jquerySelectorToManage = jquerySelectorToManage;
    }

    init() {

    }

    /**
     *
     * @param {Window}  window
     */
    show(window) {

    }

    dispose() {
        this.disposed = true;
        this.disposeImpl();

    }
    disposeImpl() {

    }
    visibleChange(value) {
        this.visible = value;
        this.visibleChangeImpl(value)
    }
    visibleChangeImpl(value) {
    }
}