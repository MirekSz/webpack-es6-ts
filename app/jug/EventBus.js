function EventBus() {
    this.listeners = [];
}

EventBus.prototype.addListener = function (listener) {
    let index = this.listeners.indexOf(listener);
    if (index !== -1) {
        throw new Error('Listener already added');
    }
    this.listeners.push(listener);
};

EventBus.prototype.removeListener = function (listener) {
    let index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
};

EventBus.prototype.fire = function (eventName, eventData) {
    for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        if (listener.eventName === eventName) {
            listener.handle(eventData);
        }
    }
};

var eb = new EventBus();


var listener = {
    eventName: 'RowSelected', handle: function (data) {
        console.log('RowSelected: ', data);
    }
};
eb.addListener(listener);

eb.fire('RowSelected', {id: 1});
eb.fire('RowSelected', {id: 2});

eb.removeListener(listener);

eb.fire('RowSelected', {id: 3});


