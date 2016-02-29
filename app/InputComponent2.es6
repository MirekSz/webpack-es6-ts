import template  from './template.hbs';

export class InputGUI2 {
    renderTo(element) {
        var target = element;

        if (element instanceof String) {
            target = $(element);
        }
        this.target = target;
        $(target).html(template());
    }

    /**
     *
     * @param {String} val
     */
    setValue(val) {
        $(this.target).find(':input').val(val);
    }

    /**
     * Callback for adding two numbers.
     *
     * @callback AddStuffCallback
     * @param {String} val - An integer.
     * @param {Number} kind - An integer.
     */

    /**
     * Add two numbers together, then pass the results to a callback function.
     *
     * @param  listener - A callback to run.
     * @param {AddStuffCallback} listener.onValueChange - A callback to run.
     */
    addListener(listener) {
        $(this.target).find(':input').keyup((e)=> {
            console.log('e: ');
            console.log(e.target.value);
        });
    }

}

let inputGUI = new InputGUI2();
inputGUI.renderTo("#app2");
inputGUI.setValue("mirek");

inputGUI.addListener({
    onValueChange: (val, kind)=> {
    }
});