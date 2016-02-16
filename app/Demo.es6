"use strict";
/**
 * Created by Mirek on 2016-02-15.
 */

class Demo {

    constructor() {
        this.counter = 0;
        console.log('Demo: ');
    }

    sayHello() {
        this.counter++;
        console.log('sayHello:  ' + this.counter);
        return this.counter;
    }

    sayHello2() {
        console.log('sayHello: ');
    }


}

export default Demo;