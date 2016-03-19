"use strict";
/**
 * Created by Mirek on 2016-03-01.
 */
import modules from './ModuleRegistry.es6'
class LazyModule {
    constructor() {

    }

    init() {
        modules.cache.push(this);
        modules.list()
    }

}
export default new LazyModule();
