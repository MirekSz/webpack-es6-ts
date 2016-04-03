import Window from './TabWindow';
import BaseWindowManager from './BaseWindowManager';
import panelsRegion from './panels-region.hbs';
import panelDef from './panel-def.hbs';


export default class WindowManager extends  BaseWindowManager{
    constructor(jquerySelectorToManage) {
        super(jquerySelectorToManage);
        /**@type {Array<BaseWindow>} */
        this.windows = [];
    }

    init() {
        this.$sectionToManage.html(panelsRegion());

        this.$panel = this.$sectionToManage.find('.panel');
        this.$panelsHistory = this.$sectionToManage.find('.panels_history');
        this.$history = this.$sectionToManage.find('.history');
    }

    /**
     *
     * @param {Window}  window
     */
    show(window) {
        var currentWindow = this.currentWindow();
        if (currentWindow) {
            this.hideCurrentWindow();
        }
        this.windows.push(window);

        this.renderContent(window);
        this.addCloseAction(window.id);

        this.buildHistory(window);
    }

    buildHistory(window) {
        this.$history.html(this.$history.html() + '/' + window.id);
    }

    /**
     *
     * @param {BaseWindow} window
     */
    renderContent(window) {
        this.$panel.html(panelDef(window));

        var $content = this.$panel.find('.panel-body');
        window.renderTo($content);
        window.visibleChange(true);
    }

    hideCurrentWindow() {
        var currentWindow = this.currentWindow();
        currentWindow.visibleChange(false);

        var panelToHide = this.$panel.children();
        panelToHide.detach().appendTo(this.$panelsHistory);
    }

    showWindow(id) {
        var currentWindow = this.currentWindow();
        currentWindow.visibleChange(true);

        var panelToShowFromHistory = this.$panelsHistory.find('#panel_' + id);
        panelToShowFromHistory.detach().appendTo(this.$panel);
    }

    /**
     *
     * @returns {BaseWindow}
     */
    currentWindow() {
        if (this.windows.length == 0) {
            return false;
        }
        return this.windows[this.windows.length - 1];
    }

    removeCurrentWindow() {
        var window = this.windows[this.windows.length - 1];
        this.$history.html(this.$history.html().replace('/' + window.id, ''));

        this.windows.splice(-1, 1);
    }

    disposeCurrentAndShowPrev() {
        var window = this.currentWindow();
        window.dispose();
        this.removeCurrentWindow();

        var prevWindow = this.currentWindow();
        this.showWindow(prevWindow.id)
    }

    /**
     * @protected
     * @param id
     */
    addCloseAction(id) {
        var self = this;
        var closeButton = $(`${this.jquerySelectorToManage} .panel #panel_${id} .panel-heading button`);
        closeButton.click(function () {
            $(this).closest('.panel').remove();

            self.disposeCurrentAndShowPrev();
        });
    }

    disposeImpl() {
        for (var i = 0; i < this.windows.length; i++) {
            var window = this.windows[i];
            window.dispose();
        }
    }

    visibleChangeImpl(value) {
        for (var i = 0; i < this.windows.length; i++) {
            var window = this.windows[i];
            window.visibleChange(value);
        }
    }
}