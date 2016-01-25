var expect = chai.expect;

import Demo from '../app/Demo';

describe('Main function', function () {


    it('should fill the text fields that correspond to an answer', function () {
        var demo = new Demo();
        var sayHell = demo.sayHell('mire');
        var value = 'Hello: <h1>siema mire</h1';
        expect(sayHell).to.be.eq(value);
    });

    it('should select the options that correspond to an answer', function (done) {
        require(['./lazy.es6'], function (module) {
            expect(new module.Miro().getVal()).to.be.eq(5);
            done()
        });
    });

    it('should skip fields where the question has changed', function () {
    });
});

describe('Initialization', function () {
    it('should initialize the main object', function () {
    });
});

