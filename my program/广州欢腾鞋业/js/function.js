//解决兼容的函数库
//1.类名获取的兼容
 /*****************************/
  function getClass(classname,obj){
  	  var obj=obj||document //(参数的初始化)
  	  //如果传参了按照的传参走，如果没有传参的话，obj默认为document
      if(obj.getElementsByClassName){
    	  return obj.getElementsByClassName(classname);
      }else{
    	   var arr=[];//声明一个空的数组 用来添加
           var all=obj.getElementsByTagName("*");
           for(var i=0;i<all.length;i++){
         	   if(checkpre(all[i].className,classname)){  //匹配到相同的类名
                   arr.push(all[i]);    //把一样的类名添加到数组中
         	   }  
           }
          return arr;
      }
  }
  function checkpre(classname,str){   //解决获取的时候获取多个类名，而实际只需要一个类名
      var arr=classname.split(" ");   // 例如：<div class="box box1"></div> 只需要box。
      for(var i in arr){
        if(arr[i]===str){
          return true;
        }
      }
          return false;
   }
 /*****************************/
//2.获取样式的兼容性
//currentStyle  getCumentedStyle
//return 具体的属性值
//obj  对象   "attr" 具体的css属性
function getStyle(obj,attr){  //"attr"属性
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }

}
 /*****************************/
//3.获取元素的兼容函数
//"#"-id    "."-类名    "a"-标签名
//selecter（选择器） :1)当它为字符串时，获取元素;
//                    2)当它为函数时，实现页面加载完成;  变相使用了window.onload $(function(){})
function $(selecter,obj){
	var obj=obj||document; //参数初始化
	if(typeof selecter=="string"){
		selecter=selecter.replace(/^\s*|\s*$/g,"");
        if(selecter.charAt(0)=="."){ //获取出类
           return getClass(selecter.slice(1),obj);//截取 识别（./#）
        }else if(selecter.charAt(0)=="#"){//获取出ID
           return document.getElementById(selecter.slice(1));
        }else if(/^[a-zA-Z][a-z0-6]{0,8}$/.test(selecter)){//正则 怎么去设置标准的标签
           return obj.getElementsByTagName(selecter);
        }else if(/^<[a-zA-Z][a-z0-6]{0,8}>$/.test(selecter)){
           return document.createElement(selecter.slice(1,-1));
        }
	}else if(typeof selecter=="function"){
		window.onload=function(){
			selecter();
		}
	}
}                    
 /*****************************/
//4.获取节点中的子节点
//obj：父节点
//type："no"  子节点只有元素的节点
//      "yes"  子节点有元素节点与非空的文本节点
function getChilds(obj,type){
  var type=type||"no";      
  var childs=obj.childNodes;
  var arr=[];
  for(var i=0;i<childs.length;i++){
     if(type=="no"){    //只有元素的节点
        if(childs[i].nodeType==1){  //判断为元素节点时候 添加数组
          arr.push(childs[i]);
        }
     }else if(type=="yes"){//元素+非空的文本节点
        if(childs[i].nodeType==1||childs[i].nodeType==3 && childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
          arr.push(childs[i]);   //判断为元素节点和非空的文本节点时候 添加数组
        }
     }
  }
      return arr;      //返回数组

}
 /*****************************/
//5.获取第一个子节点
function getFirst(obj,type){
  var type=type||"no";
  if(type=="no"){
     return getChilds(obj,"no")[0];
  }else if(type=="yes"){
     return getChilds(obj,"yes")[0];
  }
}
/*****************************/
//6.获取最后一个子节点
function getLast(obj,type){
  var type=type||"no";
  if(type=="no"){
     return getChilds(obj,"no")[getChilds(obj,"no").length-1];
  }else if(type=="yes"){
     return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
  }
}
/*****************************/
//7.获取指定子节点
function getNum(obj,type,num){
  var type=type||"no";
  if(type=="no"){
     return getChilds(obj,"no")[num-1];
  }else if(type=="yes"){
     return getChilds(obj,"yes")[num-1];
  }
}
/*****************************/
//8.获取下一个兄弟节点
function getNext(obj,type){
  var type=type||"no";
  var next=obj.nextSibling;
  if(next==null){
    return false;
  }
  if(type=="no"){
     while(next.nodeType==3||next.nodeType==8){
        next=next.nextSibling;
         if(next==null){
            return false;
         }
     }
  }else if(type=="yes"){
     while(next.nodeType==3 && !next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
        next=next.nextSibling;
         if(next==null){
            return false;
         }
     }
  }
    return next;
}
/*****************************/
//9.获取上一个兄弟节点
function getPre(obj,type){
  var type=type||"no";
  var pre=obj.previousSibling;
  if(pre==null){
    return false;
  }
  if(type=="no"){
     while(pre.nodeType==3||pre.nodeType==8){
        pre=pre.previousSibling;
     }
  }else if(type=="yes"){
     while(pre.nodeType==3 && !pre.nodeValue.replace(/^\s*|\s*$/g,"")||pre.nodeType==8){
        pre=pre.previousSibling;
     }
  }
    return pre;
}
/*****************************/
//10.把一个元素插入到某一个元素之前
function insertBefore(newObj,beforeObj){
  var parent=beforeObj.parentNode;
  parent.insertBefore(newObj,beforeObj);
}
/*****************************/
//11.把一个元素插入到某一个元素之后
function insertAfter(newObj,beforeObj){
  var next=getNext(beforeObj,"yes");
  var parent=beforeObj.parentNode;
  if(next){
      parent.insertBefore(newObj,next);
  }else{
      parent.appendChild(newObj);
  }
}
/*****************************/
//12.绑定事件的兼容函数
//添加事件   obj事件源对象  e事件对象
function addEvent(obj,event,fun){
   if(obj.attachEvent){  // 绑定在obj身上的是funEvent
       obj.attachEvent("on"+event,funEvent);
   }else{                 // 绑定在obj身上的是funEvent
       obj.addEventListener(event,funEvent,false)
   }
   return funEvent;
   function funEvent(e){
      //兼容事件对象    e在W3C中使用 window.event在IE低版本中使用
      var ev=e||window.event;
      //改变this指针，并且传递事件对象
        fun.call(obj,ev);
   }
}
//13.删除事件
function removeEvent(obj,event,fun){
   if(obj.attachEvent){   //删除的事件也应该是funEvent
       obj.detachEvent("on"+event,fun);
   }else{
       obj.removeEventListener(event,fun,false)
   }
}
/*****************************/
//14. 兼容鼠标滚轮的函数
function mousewheel(obj,upfun,downfun){
  if(obj.attachEvent){
     obj.attachEvent("onmousewheel",scrollFn);//IE、opera
  }else if(obj.addEventListener){
    obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit-
    obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
  }
   function scrollFn(e){
    var eve=e||window.event;  //兼容事件对象    e在W3C中使用 window.event在IE低版本中使用
    if(eve.preventDefault){//阻止浏览器的默认行为
       eve.preventDefault();
    }else{
       eve.returnValue=false;
    }
    var fangxiang=eve.wheelDelta||eve.detail;  //前 IE chrome  //后 火狐
    //FF     向上：-3 向下：3
    //IE     向上：120  向下：-120
    //chrome 向上：120  向下：-120
    if(fangxiang==-3||fangxiang==120){
      if(upfun){
       upfun();
      }
    }
    if(fangxiang==3||fangxiang==-120){
      if(downfun){
       downfun();
      }
    }
   }
}
/*****************************/
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//16.设置cookie
function setCookie(attr,value,time){
  if(time){
     var nowtime=new Date();
     nowtime.setTime(nowtime.getTime()+time*1000);
     document.cookie=attr+"="+value+";expires="+nowtime.toGMTString();
  }else{
     document.cookie=attr+"="+value;
  }
}
/********************************/
//获取cookie
function getCookie(attr){
    var cookies=document.cookie;
    var arr=cookies.split("; ");
    for(var i=0;i<arr.length;i++){
      var brr=arr[i].split("=");
      if(brr[0]==attr){
          return brr[1];
      }
    }
    return false;
}
/********************************/
//删除cookie
function delCookie(attr){
     var nowtime=new Date();
     nowtime.setTime(nowtime.getTime()-1);
     document.cookie=attr+"=kong"+";expires="+nowtime.toGMTString();
}
/********************************/