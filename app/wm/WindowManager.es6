import Window from './TabWindow';
import panelsRegion from './panels-region.hbs';
import panelDef from './panel-def.hbs';


export default class WindowManager {
    constructor(idSectionToManage) {
        /**@type {jQuery} */
        this.$sectionToManage = $('#' + idSectionToManage);
        this.idSectionToManage = idSectionToManage;
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

    renderContent(window) {
        this.$panel.html(panelDef(window));

        var $content = this.$panel.find('.panel-body');
        window.renderTo($content);
    }

    hideCurrentWindow() {
        var panelToHide = this.$panel.children();
        panelToHide.detach().appendTo(this.$panelsHistory);
    }

    showWindow(id) {
        var panelToShowFromHistory = this.$panelsHistory.find('#panel_' + id);
        panelToShowFromHistory.detach().appendTo(this.$panel);
    }

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
        var closeButton = $(`#${this.idSectionToManage} .panel #panel_${id} .panel-heading button`);
        closeButton.click(function () {
            $(this).closest('.panel').remove();

            self.disposeCurrentAndShowPrev();
        });
    }
    dispose(){
        for (var i = 0; i < this.windows.length; i++) {
            var window = this.windows[i];
            window.dispose();
        }
    }
}