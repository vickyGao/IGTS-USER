var rootApp = angular.module('RootApp', ['ngCookies', 'ngRoute', 'ui.bootstrap']);

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

function indexRouteConfig($routeProvider) {
    $routeProvider.
        when('/', {
        	templateUrl: 'pages/mainTemplate.html'
        }).
        when('/main', {
            templateUrl: 'pages/mainTemplate.html'
        }).
        when('/search/:search_term', {
            templateUrl: 'pages/groupDetailTemplate.html'
        }).
        when('/commodityDetail/:commodityId', {
            templateUrl: 'pages/detailTemplate.html'
        }).
        when('/buy/:commodityId', {
            templateUrl: 'pages/buyTemplate.html'
        }).
        when('/ownerinfo/:userId', {
            templateUrl: 'pages/ownerManagementTemplate.html'
        }).
        when('/buySuccess', {
            templateUrl: 'pages/buySuccessTemplate.html'
        }).
        when('/test', {
            templateUrl: 'pages/testAn.html'
        });
        /*.
        otherwise({
            redirectTo: '/index'
        });*/
}

rootApp.config(indexRouteConfig);


/* Register the interceptor */
rootApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
});

/* Deal with exceptions in login.html */
rootApp.factory('errorHttpInterceptor', function ($q, $rootScope) {
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

/* Services of Tag */
rootApp.factory('TagService', function (authHttp) {
    return {
        listDetail: function () {
            return authHttp.get('user/api/tag/detail');
        }
    };
});

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
        getAllForUser: function (conditions) {
            var config = {params: conditions};
            return authHttp.get('user/api/commodity/detail', config);
        },
        updateCommodityActiveState: function (activestate, commodityId) {
             var path = 'user/api/commodity/activestate/' + activestate + "/" + commodityId;
             return authHttp.put(path, null ,null);
        }
    };
});

rootApp.factory('UserService', function (authHttp) {
    return {
        create: function (user) {
            return authHttp.post('user/api/user/entity', user);
        },
        updatePass: function (user, oldpassword) {
            return authHttp.put('user/api/user/entity' + "/" + oldpassword, user);
        },
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


rootApp.factory('MessageService', function (authHttp) {
    return {
         create: function (message) {
             return authHttp.post('user/api/message/entity', message);
         },
         getByCommodityId: function (conditions) {
             var config = {params: conditions};
             return authHttp.get('user/api/message/entity', config);
         }
    }
});

rootApp.factory('AddressService', function (authHttp) {
    return {
    	create: function (address) {
            return authHttp.post('user/api/address/entity', address);
        },
        update: function (address) {
            return authHttp.put('user/api/address/entity', address);
        },
        getById : function(addressId){
            return authHttp.get('user/api/address/entity' + "/" + addressId);
        },
        delete: function (addressId) {
            var path = 'user/api/address/entity' + "/" + addressId;
            return authHttp.delete(path);
        },
         getListForUser: function () {
             return authHttp.get('user/api/address/entity');
         }
    }
});

rootApp.factory('IndentService', function (authHttp) {
    return {
    	 create: function (commodityid, indent) {
             return authHttp.post('user/api/indent/entity/' + commodityid, indent);
         },
         getTenantForUser: function (conditions) {
             var config = {params: conditions};
             return authHttp.get('user/api/indent/entity', config);
         },
         getTenantById: function (indentId) {
             return authHttp.get('user/api/indent/entity' + "/" + indentId);
         },
         updateIndentStatus: function (dealoperate, indentId, payTypeConfig) {
             var config = {params: payTypeConfig};
             return authHttp.put('user/api/indent/entity/' + dealoperate + "/" + indentId, null ,config);
         },
         getTenantForSeller: function (conditions) {
             var config = {params: conditions};
             return authHttp.get('user/api/indent/entity/seller', config);
         }
    };
});

rootApp.factory('HomePageService', function (authHttp) {
    return {
        getAllSlices: function () {
            return authHttp.get('user/api/home/slice/detail');
        },
        getAllHotCommodities: function () {
            return authHttp.get('user/api/home/hot/detail');
        },
        getAllCustomModules: function () {
            return authHttp.get('user/api/home/custommodule/detail');
        }
    }
});

rootApp.factory('FavoriteService', function (authHttp) {
    return {
        create: function (favorite) {
            var path = 'user/api/favorite/entity';
            return authHttp.post(path, favorite);
        },
        getForUser: function (conditions) {
        	 var config = {params: conditions};
            return authHttp.get('user/api/favorite/detail', config);
        },
        deleteFavorite: function (favoriteId) {
        	var path = 'user/api/favorite/entity/' + favoriteId;
            return authHttp.delete(path);
        }
    };
});

rootApp.factory('BillService', function (authHttp) {
        return {
            getListForUser: function (conditions) {
                var config = {params: conditions};
                return authHttp.get('user/api/bill/entity', config);
            },
            deleteBill: function (billId) {
                var path = 'user/api/bill/entity/' + billId;
                return authHttp.delete(path);
            }
        };
});
