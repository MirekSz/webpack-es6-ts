var expect = chai.expect;


describe('Main function', function () {


    it('should fill the text fields that correspond to an answer', function () {
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

