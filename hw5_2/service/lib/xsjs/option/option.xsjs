const Optionlib = $.import('xsjs.option', 'option').option;
const optionLib = new Optionlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET : {
                    optionLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    optionLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                // case $.net.http.POST : {
                //     optionLib.doPost(JSON.parse($.request.body.asString()));
                //     break;
                // } //DID't work now
                case $.net.http.DEL : {
                    optionLib.doDelete($.request.parameters.get("optionid"));
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
