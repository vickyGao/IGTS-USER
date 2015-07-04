var rootApp = angular.module('RootApp', ['ngCookies', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngFileUpload']);

/* Add authHttp to send request, will add token into header automatically */
rootApp.factory('authHttp', function ($http, $cookieStore) {
    var authHttp = {};

    var extendHeaders = function (config) {
        config.headers = config.headers || {};
        config.headers['x-auth-token'] = $cookieStore.get('x-auth-token');
    };

    angular.forEach(['get', 'delete', 'head'], function (name) {
        authHttp[name] = function (url, config) {
            config = config || {};
            extendHeaders(config);
            return $http[name](url, config);
        };
    });
    angular.forEach(['post', 'put'], function (name) {
        authHttp[name] = function (url, data, config) {
            config = config || {};
            extendHeaders(config);
            return $http[name](url, data, config);
        };
    });
    return authHttp;
});

/* Register the interceptor */
rootApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
});

/* Deal with exceptions in login.html */
rootApp.factory('errorHttpInterceptor', function ($q, $rootScope, $location) {
    return {
        'response': function (response) {
            return response;
        },
        'responseError': function (rejection) {
            if (rejection.status === 401) {
                window.location.href = 'login.html';
            } else if (rejection.status === 412) {
                showDialog('Warning', rejection.data);
            } else if (rejection.status >= 400 && rejection.status <= 500) {
                showDialog('Error', rejection.data);
            }
            return $q.reject(rejection);
        }
    }
});

/* Display a dialog, success: green, info: blue, warning: yellow, error: red */
function showDialog(type, content) {
    var className = 'dialog-default';
    if ('Success' == type) {
        className = 'dialog-success';
    } else if ('Warning' == type) {
        className = 'dialog-warning';
    } else if ('Error' == type) {
        className = 'dialog-error';
    }
    var d = dialog({
        fixed: true,
        align: 'right top',
        title: type,
        content: content,
        skin: className,
        quickClose: true,
        zIndex: 9999
    });
    d.show();
}

/* Display a dialog with ok/cancel */
function showConfirmDialog(content, callback) {
    var d = dialog({
        title: '提示',
        content: content,
        okValue: '确定',
        ok: function () {
            callback.ok(this);
        },
        cancelValue: '取消',
        quickClose: true,
        zIndex: 9999,
        cancel: function () {
            callback.cancel();
        }
    });
    d.show();
}

/* Services of commodity */
rootApp.factory('CommodityService', function (authHttp) {
    return{
        getDetail: function (commodityId) {
            var path = 'user/api/commodity/detail/' + commodityId;
            return authHttp.get(path);
        },
        query: function (conditions) {
            var config = {params: conditions};
            return authHttp.get('user/api/commodity/search_term', config);
        },
        create: function (commodity) {
            return authHttp.post('user/api/commodity/entity', commodity);
        }
    };
});

rootApp.factory('UserService', function (authHttp) {
    return {
        getDetail: function (userId) {
            var path = 'user/api/user/detail/' + userId;
            return authHttp.get(path);
        },
        getByToken: function () {
            return authHttp.get('user/api/user/detail/token');
        }
    }
});

rootApp.factory('AuthorizationService', function (authHttp) {
    return {
        logout: function () {
            return authHttp.delete('user/api/authorization/logout');
        }
    }
});

rootApp.factory('CoverService', function (authHttp) {
    return {
        create: function (commodityId, postBody) {
            var path = 'user/api/cover/entity/' + commodityId;
            return authHttp.post(path, postBody);
        }
    }
});

rootApp.factory('ImageService', function (authHttp) {
    return {
        getAll: function () {
            return authHttp.get('user/api/image/entity');
        }
    }
});

/* Services of Tag */
rootApp.factory('TagService', function (authHttp) {
    return {
        listDetail: function () {
            return authHttp.get('user/api/tag/detail');
        }
    };
});

