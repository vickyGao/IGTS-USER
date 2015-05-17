rootApp.controller('MessageManmgerController', function ($scope, $routeParams) {
	    $scope.$on('event:flushMessageListRequest', function (event, config) {
	        $scope.$broadcast('event:flushMessageList', config);
	    });
	    $scope.$on('event:showMessagePaginationRequest', function (event, currentPage, totalPages) {
	        $scope.$broadcast('event:showMessagePagination', currentPage, totalPages);
	    });
});

rootApp.controller('CreateMessageController', function ($scope, $routeParams, MessageService) {
		$scope.message= null;
		$scope.messageleft = function(){
			if($scope.message == null ){
				return 140;
			}
			var countMessage= 140-$scope.message.content.length;
			if(countMessage >= 0){
				return 140-$scope.message.content.length;
			}else{
				$scope.message.content = $scope.message.content.substring(0, 140);
			}
		};
	    $scope.doSubmit = function () {
	        if ($scope.message.content.length=0) {
	        	alert("留言内容不能为空!");
	        }
	        
	        $scope.message.commodityid = $routeParams.commodityId;
	        $scope.message.floor = "1";
	        
	        var request = {
	            "message": $scope.message
	        };
	        MessageService.create(request).success(function (data) {
	        	$scope.message.content = "";
	        	var config = {
	                    page: 0,
	                    size: 5,
	                    commodityid: $routeParams.commodityId
	                };
                $scope.$emit('event:flushMessageListRequest', config);
            });
	     };
	});

rootApp.controller('ReplyMessageController', function ($scope, $routeParams, MessageService) {
	$scope.replyleft = function(){
		if($scope.reply == null ){
			return 100;
		}
		var countReply= 100-$scope.reply.content.length;
		if(countReply >= 0){
			return 100-$scope.reply.content.length;
		}else{
			$scope.reply.content = $scope.reply.content.substring(0, 100);
		}
	};
	$scope.saveReply = function(parentmessageid){
        if ($scope.reply.content.length=0) {
        	alert("回复内容不能为空!");
        }
        $scope.reply.commodityid = $routeParams.commodityId;
        $scope.reply.floor = "1";
        $scope.reply.parentid = parentmessageid;
        
        var request = {
            "message": $scope.reply
        };
        MessageService.create(request).success(function (data) {
        	$scope.reply.content = "";
        	var config = {
                    page: 0,
                    size: 5,
                    commodityid: $routeParams.commodityId
                };
            $scope.$emit('event:flushMessageListRequest', config);
        });
	};
});

rootApp.controller('ListMessageController', function ($scope, $routeParams, MessageService) {
	 var config = {
               page: 0,
               size: 5,
               commodityid: $routeParams.commodityId
           };
	MessageService.getByCommodityId(config).success(function (data) {
		$scope.messageList  = getMessageVertical(null, new Array(), data.pagination.content);
        var currentPage = data.pagination.currentpage;
        var totalPages = data.pagination.pagecount;
        $scope.$emit('event:showMessagePaginationRequest', currentPage, totalPages);
   });
	$scope.$on('event:flushMessageList', function (event, config) {
		MessageService.getTenantForUser(config).success(function (data) {
			$scope.messageList  = getMessageVertical(null, new Array(), data.pagination.content);
	        var currentPage = data.pagination.currentpage;
	        var totalPages = data.pagination.pagecount;
	       $scope.$emit('event:showMessagePaginationRequest', currentPage, totalPages);
		});
	});
	
	$scope.replyAction = function(index, replystatus){
		angular.forEach($scope.messageList, function (data) {
	           data.replystatus = false;
	       });
		$scope.messageList[index].replystatus = !replystatus;
		return;
	};
	$scope.reply_style = "reply_style";
});

/*recurrence to get all the messages*/
rootApp.controller('MessagePaginationMessageController', function ($scope, $routeParams, MessageService) {
		$scope.isShow = false;
	$scope.$on('event:showMessagePagination',function (event, currentPage, totalPages) {
		if(totalPages != 0){
			$scope.isShow = true;
		}
        $scope.isFirstPage = false;
        $scope.isLastPage = false;
        var pageArray = [];
        totalPageNumber = totalPages;
        if (totalPages > 10) {
            for (i = 1; i <= 10; i++) {
                var currentPageFlag = false;
                if (i - 1 == currentPage) {
                    currentPageFlag = true;
                }
                pageArray[i - 1] = {
                    pageNumber: i,
                    isCurrentPage: currentPageFlag
                }
            }
        } else {
            for (i = 1; i <= totalPages; i++) {
                var currentPageFlag = false;
                if (i - 1 == currentPage) {
                    currentPageFlag = true;
                }
                pageArray[i - 1] = {
                    pageNumber: i,
                    isCurrentPage: currentPageFlag
                }
            }
        }
        $scope.previousPageNumber = currentPage;
        $scope.NextPageNumber = currentPage + 2;
        $scope.pages = pageArray;
        if (currentPage == 0) {
            $scope.isFirstPage = true;
        }
        if ((currentPage == totalPages - 1) || totalPages == 0) {
            $scope.isLastPage = true;
        }
    });
    $scope.doJumpPage = function (pageNumber) {
        pageNumber -= 1;
        if (pageNumber >= 0 && pageNumber < totalPageNumber) {
        	 var config = {
        			 page: pageNumber,
                     size: 5,
                     commodityid: $routeParams.commodityId
                 };
            $scope.$emit('event:flushMessageListRequest', config);
        }
        return;
    };
});

function getMessageVertical(parentname, messageList, content){
    angular.forEach(content, function (message) {
    	if(parentname != null){
    		message.isreply = true;
    		message.content = "回复   " + parentname + " " + message.content;
    	}
 	   message.replystatus = false;
 	   messageList.push(message);
 	   if(message.messages != null){
 		  getMessageVertical(message.username, messageList, message.messages);
 	   }
    });
    return messageList;
}