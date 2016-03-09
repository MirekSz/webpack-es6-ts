export function start() {

    new CustomerServiceImpl().sayHello("mirek").then((res:CustomerDto)=> {
        return res.name;
    }).then((res:string)=> {
        return res + "2";
    }).then((res:string)=> {
        $(document.body).html(res);
        console.log(res);
    })
}
class CustomerDto {
    name:string;
    @younger
    prev:number;
    age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;

    }
}

interface CustomerService<T> {
    sayHello(name:string);
}

class CustomerServiceImpl implements CustomerService<CustomerDto> {
    @log
    sayHello(name:string):Promise<any> {
        return new Promise<any>((resolve, reject)=> {
            setTimeout(() => {
                resolve(new CustomerDto(name, 30));
            }, 1000);
        });
    }
}

new CustomerServiceImpl().sayHello('mirek').then(function (data) {
    console.log('data: ');
    console.log(data);
    console.log(data.prev);
});

function log(target:Object, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
    var originalMethod = descriptor.value; // save a reference to the original method

    // NOTE: Do not use arrow syntax here. Use a function expression in
    // order to use the correct value of `this` in this method (see notes below)
    descriptor.value = function (...args:any[]) {
        console.log("The method args are: " + JSON.stringify(args)); // pre
        var result = originalMethod.apply(this, args);               // run and store the result
        console.log("The return value is: " + result);               // post
        return result;                                               // return the result of the original method
    };

    return descriptor;
}

function younger(target:Object, key:string) {
    target[key] = 15
}

//https://gist.github.com/remojansen/16c661a7afd68e22ac6e
