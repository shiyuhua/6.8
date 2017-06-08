/**
 * Created by lenovo on 2017/3/17.
 */
$(window).ready(function(){

    /*链接目录效果开关*/
    var directory_flag=false;
    /*浏览器尺寸效果开关 */
    var screenFlag1=true;
    var screenFlag2=true;
    $(window).resize(function(){
        if($(document).width()>767){
            if(screenFlag1){
                $(document.body).removeClass("Topnav-Body");
                directory_flag=false;
                $(".directory dl").removeAttr("style");
                screenFlag1=false;
                screenFlag2=true;
            }

        }else{
            if(screenFlag2){
                directory_flag=true;
                screenFlag1=true;
                screenFlag2=false;

            }

        }

    });

    var flag=true;
    $(".topnavbox .topnav li:nth-last-child(3)").click(function(){

        if(flag){
            flag=false;

            // × 线条
            $(this).find(".btnbox").css({transform: "rotate(90deg)"});
            $(this).find(".btnbox .btn-line1").css({transform: "translateY(4px) rotate(45deg)"});
            $(this).find(".btnbox .btn-line2").css({transform: "translateY(-4px) rotate(-45deg)"});

            //购物袋
            $(".topnavbox .topnav li:nth-last-child(1) a").animate({right:-60});

            $(document.body).addClass("Topnav-Body");
            $(document.body).removeClass("Topnav-Body-44");
        }else{
            flag=true;
            $(this).find(".btnbox").removeAttr("style");
            $(this).find(".btnbox .btn-line1").removeAttr("style");
            $(this).find(".btnbox .btn-line2").removeAttr("style");

            //购物袋
            $(".topnavbox .topnav li:nth-last-child(1) a").animate({right:0});

            $(document.body).addClass("Topnav-Body-44");
            $(document.body).removeClass("Topnav-Body");
        }

    })

    var cw=document.documentElement.clientWidth;
    if(cw>767){
        $(document.body).removeClass("Topnav-Body");
        directory_flag=false;
    }else{
        directory_flag=true;
    }

    /*小屏链接目录*/
    $(".directory dt").click(function(){
        if(directory_flag){

            var parent=$(this).parent();
            var height=$(this).height();
            if(parent.height()<=height){
                var childnum=parent.children().length;
                parent.animate({height:height*childnum});

                $(this).find('i').css({transform:"rotate(45deg)"});
            }else{
                parent.css({height:height});
                $(this).find('i').removeAttr("style");
            }

        }else{

        }

    });

    function bannerLunbo(){
        var imglis=$(".banner .imgbox li");
        var btnlis=$(".banner .btnbox li");
        var progress=$(".btnbox .progress");
        var lbtn=$(".banner .lbtnbox").eq(0);
        var rbtn=$(".banner .rbtnbox").eq(0);
        var t1,t2;
        var time=4000;
        var nowIndex=0;
        var nextIndex=0;
        var flag=true;
        var clickflag=true;

        t1=setInterval(autoLunbo,time);

        function autoLunbo(type){

            clickflag=false;

            var type=type||"l";
            if(type=="l"){
                nextIndex++;
                if(nextIndex>=imglis.length){
                    nextIndex=0;
                    flag=false;
                }
                imglis.eq(nowIndex).css({'z-index':10}).animate({width:'80%',height:'80%',left:-'80%'},function(){
                    flag=true;
                    nowIndex=nextIndex;
                    $(this).css({left:'100%',width:'100%',height:'100%'});

                    clickflag=true;
                });
                imglis.eq(nextIndex).css({'z-index':99}).animate({left:0});
            }else if(type=="r"){
                nextIndex--;
                if(nextIndex<0){
                    nextIndex=imglis.length-1;
                }
                imglis.eq(nowIndex).css({'z-index':10}).animate({width:'80%',height:'80%',left:'80%'},function(){
                    nowIndex=nextIndex;
                    $(this).css({left:'100%',width:'100%',height:'100%'});
                    clickflag=true;
                });
                imglis.eq(nextIndex).css({'z-index':99,left:'-100%'}).animate({left:0});
            }

        }

        rbtn.click(function(){
            if(!clickflag){
                return;
            }
            clearInterval(t1);
            clearInterval(t2);
            autoLunbo("r");
            clickBtn()
        })
        lbtn.click(function(){
            if(!clickflag){
                return;
            }
            clearInterval(t1);
            clearInterval(t2);
            autoLunbo("l");
            clickBtn()
        })

        /*底部按钮动效的当前时间*/
        var currTime=0;
        t2=setInterval(autoBtn,50);
        function autoBtn(){

            currTime=currTime+50;
            var bili=currTime/time;

            progress.eq(nextIndex).css({width:bili*100+'%'});

            if(bili>=1){
                bili=0;
                currTime=0;
            }
            if(!flag){
                $(".progress").css({width:0});
            }

        }

        var winblurFlag=true;
        $(window).blur(function(){
            if(winblurFlag){
                winblurFlag=false;
                clearInterval(t1);
                clearInterval(t2);
                currTime=0;
            }
        });
        $(window).focus(function(){
            if(!winblurFlag){
                t2=setInterval(autoBtn,50);
                t1=setInterval(autoLunbo,time);
                winblurFlag=true;
            }
        })

        /*底部按钮单击*/
        btnlis.click(function(){

            if(!clickflag){
                return;
            }
            clickflag=false;

            clearInterval(t1);
            clearInterval(t2);

            nextIndex=$(this).index();

            if(nextIndex>nowIndex){
                imglis.eq(nowIndex).css({'z-index':10}).animate({width:'80%',height:'80%',left:-'80%'},function(){
                    nowIndex=nextIndex;
                    $(this).css({left:'100%',width:'100%',height:'100%'});
                    clickflag=true;
                });
                imglis.eq(nextIndex).css({'z-index':99}).animate({left:0});
            }else if(nextIndex<nowIndex){
                imglis.eq(nowIndex).css({'z-index':10}).animate({width:'80%',height:'80%',left:'80%'},function(){
                    nowIndex=nextIndex;
                    $(this).css({left:'100%',width:'100%',height:'100%'});
                    clickflag=true;
                });
                imglis.eq(nextIndex).css({'z-index':99,left:'-100%'}).animate({left:0});
            }else{
                clickflag=true;
            }
            clickBtn();

        });

        /*单击按钮 底部按钮效果*/
        function clickBtn(){
            progress.eq(nowIndex).css({width:'100%'}).animate({opacity:0},200);
            progress.eq(nextIndex).css({width:'100%',opacity:0}).animate({opacity:1},200);
        }

    }
    bannerLunbo();

});