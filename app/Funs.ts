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
    age:number;

    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;

    }
}

interface CustomerService<T> {
    sayHello(name:string);
}

class CustomerServiceImpl implements CustomerService<CustomerDto> {
    sayHello(name:string):Promise<any> {
        return new Promise<any>( (resolve, reject)=> {
            setTimeout(() =>{
                resolve(new CustomerDto(name, 30));
            }, 1000);
        });
    }
}