import Window from './ComposableWindow';
import tabsRegion from './tabs-region.hbs';
import tabDef from './tab-def.hbs';
import tabContent from './tab-content.hbs';
import BaseWindowManager from './BaseWindowManager';
function activateBootstrapTabs(selector) {
    $(`${selector} .nav-tabs`).on("click", "a", function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
}

function removeTabAndGoToFirst(element) {
    var anchor = $(element).parent('a');
    $(anchor.attr('href')).remove();

    $(element).parent().remove(); //remove tab
    $(".nav-tabs li").children('a').first().click(); //go to first
}

function focusOnTab(window, jquerySelectorToManage) {
    var currentTabLink = `${jquerySelectorToManage} a[href="#${window.id}"]`;
    $(currentTabLink).tab('show');
};
export default class WindowManager extends BaseWindowManager{
    constructor(jquerySelectorToManage) {
        super(jquerySelectorToManage);
        /**@type {Map<String,BaseWindow>} */
        this.windows = new Map();
        /**@type {Array<BaseWindow>} */
        this.windowsInOrder = [];
    }

    init() {
        this.$sectionToManage.html(tabsRegion());

        this.$tabNavs = this.$sectionToManage.find('.nav-tabs');
        this.$tabContent = this.$sectionToManage.find('.tab-content');

        activateBootstrapTabs(this.jquerySelectorToManage);
    }

    /**
     *
     * @param {ComposableWindow}  window
     */
    show(window) {
        var windowId = window.id;
        if (this.windows.has(windowId)) {
            this.openTab(window, true);
        } else {
            this.windows.set(windowId, window);

            this.addTabDef(window);
            this.addTabContent(window);
            this.openTab(window);
            this.addCloseAction(windowId);
        }
    }

    alreadyOpen(id) {
        return this.windows.has(id);
    }

    showExisting(id) {
        this.openTab(id);
    }

    openTab(window, existing) {
        focusOnTab(window, this.jquerySelectorToManage);

        var current = this.currentWindow();
        if (current) {
            current.visibleChange(false);
        }
        if (!existing) {
            this.windowsInOrder.push(window);
        }
        window.visibleChange(true);
    }

    addTabContent(window) {
        this.$tabContent.append(tabContent(window));

        var $tabContent = $(this.$tabContent.find('#' + window.id));
        window.renderTo($tabContent)
    }

    addTabDef(window) {
        this.$tabNavs.append(tabDef(window));
    }

    addCloseAction(id) {
        var self = this;
        var closeButton = $(`${this.jquerySelectorToManage} a[href="#${id}"] button`);

        closeButton.click(function () {
            removeTabAndGoToFirst(this);
            self.disposeCurrentAndActivateFirst(id);
        });
    }

    disposeCurrentAndActivateFirst(id) {
        var window = this.windows.get(id);
        window.dispose();

        if (this.windowsInOrder.length > 0) {
            this.windowsInOrder[0].visibleChange(true);
        }
    }

    disposeImpl() {
        for (var window of this.windows.values()) {
            window.dispose();
        }
    }

    /**
     *
     * @returns {ComposableWindow}
     */
    currentWindow() {
        var window = undefined;
        this.windowsInOrder.forEach((element)=> {
            if (element.visible) {
                window = element;
            }
        });
        return window;
    }

    visibleChangeImpl(value) {
        for (var i = 0; i < this.windows.length; i++) {
            var window = this.windows[i];
            window.visibleChange(value);
        }
    }
}