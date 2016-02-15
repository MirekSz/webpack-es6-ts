"use strict";
/**
 * Created by Mirek on 2016-02-15.
 */
import cos from './cos.less';
console.log('cos: ');
console.log(cos);

let $app = $('#app :input');
$app.addClass(cos.kolor);
$app.addClass('tlo');
class Demo {
    constructor() {
        console.log('Demo: ');
    }

    sayHello() {
        console.log('sayHello: ');
    }

    sayHello2() {
        console.log('sayHello2: ');
    }


}

export default Demo;