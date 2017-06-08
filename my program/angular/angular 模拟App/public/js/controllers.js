angular.module("Controllers",[])
.controller("main",["$scope",function($scope){

    var swiper = new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        scrollbar:'.swiper-scrollbar',
        effect : 'flip',
        onTransitionEnd:function(){

        }
    });

}]).controller("phone",["$scope",function($scope){

}]).controller("index",["$scope",function($scope){

    $scope.active="one";
    $scope.change=function(name){
        $scope.active=name;
    }

}]).controller("todo",["$scope",function($scope){
     var list=$(".mui-navigate-right");
     var currentLeft=0;
    touch.on(".mui-navigate-right","dragstart",function(e){
        currentLeft= parseInt($(this).css("left"))?parseInt($(this).css("left")):0;
    })

     touch.on(".mui-navigate-right","drag",function(e){

            if(e.direction=="left") {
                var left=currentLeft+e.x;

                if(left<-50){
                    left=-50
                }
                console.log(left);
                $(this).css("left",left);
            }else if(e.direction=="right"){
                var left=currentLeft+e.x;

                if(left>0){
                    left=0
                }
                console.log(left);
                $(this).css("left",left);
            }
     })
}]).controller("todocon",["$scope",function($scope){

}]).controller("todoinfo",["$scope",function($scope){

}]).controller("dami",["$scope",function($scope){

}])
