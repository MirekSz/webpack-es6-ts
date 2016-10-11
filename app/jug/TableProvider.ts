/**
 * Created by Mirek on 2016-07-25.
 */

export class SearchRequest {
    searchQuery:string;
    columntType:string ;
}
export class Request {
    search:SearchRequest;
}
interface Row {
    getValue(columnId:string):any;
}
interface Response {
    rows:Array<Row>;
}

export default class TableProvider {
    getData(req:Request):Response {
        return null;
    }
}