import Window from './TabWindow';
import tabsRegion from './tabs-region.hbs';
import tabDef from './tab-def.hbs';
import tabContent from './tab-content.hbs';

function activateBootstrapTabs(id) {
    $(`#${id} .nav-tabs`).on("click", "a", function (e) {
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

export default class WindowManager {
    constructor(idSectionToManage) {
        /**@type {jQuery} */
        this.$sectionToManage = $('#' + idSectionToManage);
        this.idSectionToManage = idSectionToManage;
        this.windows = new Map();
    }

    init() {
        this.$sectionToManage.html(tabsRegion());

        this.$tabNavs = this.$sectionToManage.find('.nav-tabs');
        this.$tabContent = this.$sectionToManage.find('.tab-content');

        activateBootstrapTabs(this.idSectionToManage);
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
        var currentTabLink = `#${this.idSectionToManage} a[href="#${id}"]`;
        $(currentTabLink).tab('show');
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
        var closeButton = $(`#${this.idSectionToManage} a[href="#${id}"] button`);

        closeButton.click(function () {
            removeTabAndGoToFirst(this);

            var window = self.windows.get(id);
            window.dispose();
        });
    }

    dispose(){
        for (var window of this.windows.values()) {
            window.dispose();
        }
    }
}