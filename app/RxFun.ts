/**
 * Created by Mirek on 2016-07-21.
 */
import * as Rx from 'rx';


var source = Rx.Observable.create(function (observer) {
        // Yield a single value and complete
        var disposed = false;
        var i = 1;
        var interval = setInterval(()=> {
            if (!disposed) {
                observer.onNext(i++);
            }
        }, 200);
// observer.onCompleted();

// Any cleanup logic might go here
        return {
            "dispose": function () {
                disposed = true;
                console.log('disposed');
                clearInterval(interval);
            }
        }
    })
    ;
// var source = Rx.Observable.generate(0,
//     function (x) {
//         return x < 5112121;
//     },
//     function (x) {
//         return x + 1;
//     },
//     function (x) {
//         return x;
//     });

var subscription;
setTimeout(function () {
    console.log('dispose');
    subscription.dispose();
}, 2000);

subscription = source.filter((x:number)=>x % 2 == 0).take(22).subscribe(
    function (x) {
        console.log('onNext: %s', x);
    },
    function (e) {
        console.log('onError: %s', e);
    },
    function () {
        console.log('onCompleted');
    });

// => onNext: 42
// => onCompleted

// subscription.dispose();



