import Window from './Window';
import tabsRegion from './tabs-region.hbs';
import tabDef from './tab-def.hbs';
import tabContent from './tab-content.hbs';


export default class WindowManager {
    constructor(idSectionToManage) {
        /**@type {jQuery} */
        this.$sectionToManage = $('#' + idSectionToManage);
        this.idSectionToManage = idSectionToManage;
        this.windows = new Map();
    }

    init() {
    }

    /**
     *
     * @param {Window}  window
     */
    show(window) {
        var windowId = window.id;
        if (this.windows.has(windowId)) {
            this.openTab(windowId);
        } else {
            this.windows.set(windowId, window);

            this.addTabDef(window);
            this.addTabContent(window);
            this.openTab(windowId);
            this.addCloseAction(windowId);
        }
    }

    alreadyOpen(id) {
        return this.windows.has(id);
    }

    showExisting(id) {
        this.openTab(id);
    }

    openTab(id) {
        var currentTabId = `#${this.idSectionToManage} a[href="#${id}"]`;
        $(currentTabId).tab('show');
    }

    addTabContent(window) {
        this.$sectionToManage.find('.tab-content').append(tabContent(window));
    }

    addTabDef(window) {
        this.$sectionToManage.find('.nav-tabs').append(tabDef(window));
    }

    addCloseAction(id) {
        var closeButton = $(`#${this.idSectionToManage} a[href="#${id}"] button`);
        closeButton.click(function () {
            debugger;
            var anchor = $(this).parent('a');
            $(anchor.attr('href')).remove();

            $(this).parent().remove(); //remove tab
            $(".nav-tabs li").children('a').first().click(); //go to first
        });
    }
}