///<reference path="../typings/jquery/jquery.d.ts"/>

var template = require('./template.hbs');

export interface RenderingSupport {
    renderTo(element:JQuery);
    setValue(val:string);
}

interface Listener {
    onValueChange(val:string);
}
export interface ListenerSubject {
    addListener(listener:Listener);
}

export class InputGUI implements RenderingSupport,ListenerSubject {
    private target:JQuery;

    renderTo(element:JQuery|string) {
        var target:JQuery = <JQuery>element;

        if (element instanceof String) {
            target = $(element);
        }
        this.target = target;
        $(target).html(template());
    }

    setValue(val:string) {
        $(this.target).find(':input').val(val);
    }

    addListener(listener:Listener) {
        $(this.target).find(':input').keyup((e)=> {
            console.log('e: ');
            console.log(e);
        });
    }

}

let inputGUI = new InputGUI();
inputGUI.renderTo("#app");
inputGUI.setValue("mirek");

inputGUI.addListener({
    onValueChange: (val)=> {
    }
});