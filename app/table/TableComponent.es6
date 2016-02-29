"use strict";
import template from './template.hbs';
import css from './TableCoponent.less';
/**
 * Created by Mirek on 2016-02-16.
 */
class TableComponent {

    constructor(id) {
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
// @flow
function foo(x) {
    return x * 10;
}
foo('Hello, world!');

export default TableComponent;