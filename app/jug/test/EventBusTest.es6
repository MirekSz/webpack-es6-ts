var expect = chai.expect;

import {eb} from '../EventBusES6';
var lastEventData;
var listener = {
    eventName: 'RowSelected', handle: (data)=> {
        lastEventData = data;
        console.log('RowSelected: ', data);
    }
};
describe('Component interactions Tests...', function () {
    describe('EventBus Tests...', function () {
        var sandbox;
        beforeEach(function () {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function () {
            sandbox.restore();
            eb.listeners.clear();
        });

        it('should add listener', function () {
            //given
            var currentSize = eb.listeners.size;

            //when
            eb.addListener(listener);

            //then
            expect(eb.listeners.size).to.be.eq(currentSize + 1);
        });
        it('should invoke listener handler - by mock', function () {
            //given
            var spy = sandbox.stub(listener, 'handle');
            eb.addListener(listener);
            let eventData = {id: 1};

            //when
            eb.fire('RowSelected', eventData);


            //then
            sinon.assert.calledOnce(spy);
        });
        it('should invoke listener handler - by variable', function () {
            //given
            eb.addListener(listener);
            let eventData = {id: 1};

            //when
            eb.fire('RowSelected', eventData);


            //then
            expect(lastEventData).to.be.eq(eventData);
        });
    });
});

