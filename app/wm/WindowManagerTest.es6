var expect = chai.expect;
import WindowManager from './WindowManager'
import Window from './Window'

describe('TabWindowManager Tests...', function () {
    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
        $("#windows").empty();
    });

    it('should call render on window when TabWindowManager show it', function () {
        //given
        var windowManager = new WindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        sandbox.stub(customerWindow, 'renderTo');


        //when
        windowManager.show(customerWindow);

        //then
        expect(customerWindow.renderTo).to.have.been.calledOnce;
    });

    it('should hide current window when show next', function () {
        //given
        var windowManager = new WindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');


        //when
        windowManager.show(customerWindow);
        expect(customerWindow.visible).to.be.true;
        windowManager.show(operatorWindow);


        //then
        expect(customerWindow.visible).to.be.false;
    });

    it('should restore last window when close current', function () {
        //given
        var windowManager = new WindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');

        windowManager.show(customerWindow);
        windowManager.show(operatorWindow);

        //when
        windowManager.disposeCurrentAndShowPrev();


        //then
        expect(customerWindow.visible).to.be.true;
    });

    it('should dispose all windows when dispose manager', function () {
        //given
        var windowManager = new WindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');

        windowManager.show(customerWindow);
        windowManager.show(operatorWindow);

        //when
        windowManager.dispose();


        //then
        expect(customerWindow.disposed).to.be.true;
        expect(operatorWindow.disposed).to.be.true;
    });
});

