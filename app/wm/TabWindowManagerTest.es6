var expect = chai.expect;
import TabWindowManager from './TabWindowManager'
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
        var windowManager = new TabWindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        sandbox.stub(customerWindow, 'renderTo');


        //when
        windowManager.show(customerWindow);

        //then
        expect(customerWindow.renderTo).to.have.been.calledOnce;
    });

    it('should open next tab when show next window', function () {
        //given
        var windowManager = new TabWindowManager("#windows");
        sandbox.spy(windowManager,'openTab');
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');


        //when
        windowManager.show(customerWindow);
        windowManager.show(operatorWindow);


        //then
        expect(windowManager.openTab).to.be.calledTwice;
    });

    it('should change visibility of window when click on another tab ', function () {
        //given
        var windowManager = new TabWindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');


        //when
        windowManager.show(customerWindow);
        windowManager.show(operatorWindow);


        //then
        expect(customerWindow.visible).to.be.false;
        expect(operatorWindow.visible).to.be.true;
    });

    it('should change visibility of first window when close another tab ', function () {
        //given
        var windowManager = new TabWindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');
        
        windowManager.show(customerWindow);
        windowManager.show(operatorWindow);

        //when
        windowManager.disposeCurrentAndActivateFirst(operatorWindow.id);


        //then
        expect(operatorWindow.disposed).to.be.true;
        expect(customerWindow.visible).to.be.true;
    });

    it('should reopen tab instead of creating another tab', function () {
        //given
        var windowManager = new TabWindowManager("#windows");
        windowManager.init();
        var customerWindow = new Window('CustomerWindow');
        var operatorWindow = new Window('OperatorWindow');

        windowManager.show(customerWindow);
        windowManager.show(operatorWindow);

        //when
        windowManager.show(customerWindow);


        //then
        expect(operatorWindow.visible).to.be.false;
        expect(customerWindow.visible).to.be.true;
        expect(windowManager.windows.size).to.be.eq(2);
        expect(windowManager.windowsInOrder.length).to.be.eq(2);
    });
});

