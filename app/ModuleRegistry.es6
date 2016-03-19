"use strict";
/**
 * Created by Mirek on 2016-03-15.
 */
class ModuleRegistry {
    constructor() {
        this.cache = [];
    }

    list() {
        console.log('this.cache: ');
        console.log(this.cache);
    }

}

export default new ModuleRegistry();
