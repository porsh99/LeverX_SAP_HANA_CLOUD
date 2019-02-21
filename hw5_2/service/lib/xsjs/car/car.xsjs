const Carlib = $.import('xsjs.car', 'car').car;
const carLib = new Carlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET : {
                    carLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    carLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                // case $.net.http.POST : {
                //     carLib.doPost(JSON.parse($.request.body.asString()));
                //     break;
                // } //DID't work now
                case $.net.http.DEL : {
                    carLib.doDelete($.request.parameters.get("carid"));
                    break;
                }
                default: {
                    $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());
