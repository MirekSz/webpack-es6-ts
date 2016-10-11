var usersTemplate   = require ('./users.hbs');

import * as request from 'superagent';

export default class UsersReader{

     async renderTo($users: JQuery) {
         debugger
        var users = await this.execute();
        var args:any = {users};
        var htmlString = usersTemplate(args);
        $users.html(htmlString)
    }

    execute():Promise<Array<any>>{
        return new Promise((resolve,reject)=>{
            request.get('https://api.github.com/users').end((err,res)=>{
                resolve(res.body);
            });
        })
    }
}