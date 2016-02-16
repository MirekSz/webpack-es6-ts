"use strict";


/**
 * Created by Mirek on 2016-02-16.
 */
class TableModel {


    constructor() {
        this.columns = [];
        this.rows = [];
    }

    /**
     *
     * @param column
     */
    defineColumn(column) {
        this.columns.push(column);
    }

    addRow(row) {
        this.rows.push(row);
    }

}

export default TableModel;