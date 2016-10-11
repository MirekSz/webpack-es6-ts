import TableProvider from "./TableProvider";
import {Request} from "./TableProvider";
import {SearchRequest} from "./TableProvider";
var tableProvider = new TableProvider();

var request = new Request();
request.search = new SearchRequest();
var data = tableProvider.getData(request);