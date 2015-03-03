function rest(restUrl, httpMethod, param, contenttype, datatype) {
    var request = jQuery.ajax({
            type : httpMethod,
            url : restUrl,
            data : param,
            contentType : contenttype,
            dataType : datatype
    });
    request.success(function(data) {
        try {
            if (data === null || data === undefined) {
                console.log('no result');
            } else {
                console.log(data);
            }
        } catch (e) {
            console.log('exception');
        }
    });
    request.fail(function(textStatus, errorThrown) {
        console.log('fail');
    });
}

/* POST */
function doPost() {
    var path = contextURL + '/login';
    var contentType = "application/json";
    var postData;
    var usernamevalue = $("#userName").val();
    var passwordvalue = $("#password").val();
    postData = JSON.stringify({
            username : usernamevalue,
            password : passwordvalue
    });
    rest(path, 'POST', postData, contentType, 'json');
};

/* PUT */
function doPut() {
    var path = '';
    var contentType = "application/json";
    var putData;
    rest(path, 'PUT', putData, contentType, 'json');
}

/* DELETE */
function doDelete() {
    var path = '';
    rest(path, 'DELETE', null, null, 'json');
}

/* GET */
function doGet() {
    var path = '';
    rest(path, 'GET', null, null, 'json');
}

$(function() {
    $('.picButton').click(function() {
        doPost();
    });
});
