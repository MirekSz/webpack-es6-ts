"use strict";
import template from './template.hbs';
import css from './TableCoponent.less';
/**
 * Created by Mirek on 2016-02-16.
 */
class TableComponent {
    constructor() {

    }

    /**
     *
     * @param {TableModel}  model
     */
    bindWithModel(model) {
        this.model = model;
    }

    renderTo(target) {
        target.html(template({columns: this.model.columns, rows: this.model.rows, css}));
    }

}

export default TableComponent;