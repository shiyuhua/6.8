// classname兼容器问题
// 函数的作用：解决classname的兼容器问题
// 需要传入两个参数，一个是类名，一个是类名的父元素
	// 要在window加载完后执行
function getClass(classname,obj){
	var obj=obj||document;
	// obj不传的时候，默认是document，如果传入，是obj
	if(obj.getElementsByClassName){
		// obj.getElementsByClassName判断是否有，隐式调用Boolean,兼容器有，结果为真，执行
		return obj.getElementsByClassName(classname);
		// 输出有这个classname的类名
	}else{
		var arr=obj.getElementsByTagName("*");
		// 获取obj下的所有的标签
		var brr=[];
		for(var i=0;i<arr.length;i++){
			// // 遍历标签，看标签的类名是否和输入的classname一样
			// if(arr[i].className==classname){
			// 	brr.push(arr[i]);
			// 	// 结果要是一个数组，所以创建一个新的数组，把相同类名的标签放在数组里
			// }
			if(check(arr[i].className,classname)){
				// 当arr[i]classname为中间有空格时，无法检测，针对这个，要把arr[i]中的classname分别拿出来和classname做比较，所以可以创建一个新的函数进行比较。
				brr.push(arr[i]);
			}
		}
		return brr;
		// 返回数组
	}
}
function check(a,b){
	var narr=a.split(" ");
	// a有可能是隔了空格字符串，要想把其中的单个字符拿出来和b做比较，将它以空格为分隔符，转换成数组，里面是这些字符串
	for(var j=0;j<narr.length;j++){
		// 把这些字符串遍历
		if(narr[j]==b){
			// 只要其中有一个和b相等，说明类名相同，返回true
			return true;			
		}	
	}
	// 遍历完后没有相等的，返回false
	return false;
}
// 2样式兼容
// function getStyle(obj,yang){
// 	if(getComputedStyle(obj,null)){
// 		return getComputedStyle(obj,null)[yang];
// 	}else{
// 		return obj.currentStyle[yang];
// 	}
// }
//为什么这个不能在前面,ie看见getComputedStyle(obj,null)就报错，不执行下一步

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
		// ie可用
	}else{
		return getComputedStyle(obj,null)[attr];
		// w3c标准

	}
}
// 3封装$函数
// 获取元素，如果传入函数，变成window.onload
// /^[a-zA-Z][a-z0-6A-Z]{0,8}$/.test(selector)检测是否符合标签要求
// 替换前后空格：selector=selector.replace(/^\s*|\s*$/g,"")
function $(selector,obj){
	// 穿参，传入子元素，父元素
	var obj=obj||document;
	// 父元素没传，默认是document
	if(typeof selector=="string"){
		// 分情况，类型是字符串还是函数
		selector=selector.replace(/^\s*|\s*$/g,"");
		// 把子元素的前后空格都删除
		if(selector.charAt(0)=="."){
			// 已知的三种情况，类名，id和标签。这三个的第一位不一样，所以根据0下标来判断
			return getClass(selector.slice(1),obj);
			// 调用已经创建的函数
		}else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.slice(1));
			// id在全局只有一个，所以不需要父元素
		}else if(/^[a-zA-Z][a-z0-6A-Z]{0,8}$/.test(selector)){
			// 筛选是否是标签，用正则，将范围尽可能地缩小。
			return obj.getElementsByTagName(selector);

		}else if(/^<[a-zA-Z][a-z0-6A-Z]{0,8}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));
		}
	}else if(typeof selector=="function"){
		// 是函数时，让函数在window加载完后执行
		window.onload=function(){
			selector();
			// 相当于回调函数
		}
	}
}

// 4 子节点
// 当type为no,取所有的元素节点，反之，取所有的元素节点和内容不全为空格的文本节点
function getChilds(obj,type){
	type=type||"no";
	// type不传，默认取所有的元素节点
	var arr=[];
	var childs=obj.childNodes;
	// 获取所有的子节点
	for(var i=0;i<childs.length;i++){
		if(type=="no"){
			// 获取所有的元素节点
			if(childs[i].nodeType==1){
				arr.push(childs[i])
			}			
		}else if(type=="yes"){
			// 获取元素节点，和不为空格的文本节点
			if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(childs[i]);
			}
		}
	}
	return arr;
}
// 获取第一个子节点
function getFirst(obj,type){
	type=type||"no";
	if(type=="no"){
		// 要元素节点的第一个
		return getChilds(obj,"no")[0];
		// 返回这个只有元素节点数组的第一个
	}else if(type=="yes"){
		// 要元素或不全为空格文本的节点的第一个
		return getChilds(obj,"yes")[0];
		// 返回这个只有元素节点和不全为空格文本节点的数组的第一个

	}
}
// 获取最后一个子节点
function getLast(obj,type){
	type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[getChilds(obj,"no").length-1];
		// 返回这个只有元素节点的数组的最后一个
	}else if(type=="yes"){
		return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
	}
}
// 获取第Num个的结果
function getNum(obj,num,type){
	// num从1 开始
	type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[num-1];
		// 返回这个只有元素节点的数组的相对应下标的内容

	}else if(type=="yes"){
		return getChilds(obj,"yes")[num-1];
	}
}
// 下一个兄弟节点
function getNext(obj,type){
	type=type||"no";
	// 初始化，分两种情况，一种只取元素节点，另一种取元素元素和不全为空的文本节点
	var next=obj.nextSibling;
	// 取objd的下一个
	if(next==null){
		// 如果下一个是空，返回false
		return false;
	}
	if(type=="no"){
		while(next.nodeType==3||next.nodeType==8){
			// 当下一个节点是文本节点或者注释节点，进入循环，把当前这个的下一个赋给下一个，开始判断它的下一个是否符合条件
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
	}else if(type=="yes"){
		while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
			// 当下一个节点是全为空格的文本节点或者注释节点
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
	}
	return next;
}
// 上一个兄弟节点
function getPrev(obj,type){
	type=type||"no";
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	if(type=="no"){
		while(previous.nodeType==3||previous.nodeType==8){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
	}else if(type=="yes"){
		while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType==8){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
	}
	return previous;
}
// 节点的追加
// 封装函数insertBefore，添加在节点之前
function insertBefore(newObj,beforeObj){
	var parent=beforeObj.parentNode;
	// 获取父节点
	parent.insertBefore(newObj,beforeObj);
	// 把新的节点添加在某个节点之前
}
// 封装函数insertAfter，添加在节点之后
function insertAfter(newObj,beforeObj){
	var next=getNext(beforeObj,"yes");
	// 获取下一个节点,包括文本
	var parent=beforeObj.parentNode;
	if(next){
		// 如果下一个不为false
		parent.insertBefore(newObj,next);
		// 把新的节点添加在某节点的下一个节点之前，就是某节点的之后
	}else{
		// 下一个没有内容，为false
		parent.appendChild(newObj);
		// 把新的节点添加在父节点的最后

	}
}
// 事件添加兼容
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		// 绑定在obj身上的是funEvent，要删除的时候，删除funEvent
		obj.addEventListener(event,funEvent,false);
	}else{
		// 兼容事件对象
		obj.attachEvent("on"+event,funEvent);
	}
	return funEvent;
	function funEvent(e){
		var ev=e||window.event;
		fun.call(obj,ev);
		// 改变this指针，并且传递事件对象
	}
}
// 事件删除
function removeEvent(obj,event,fun){
	// 删除的事件是funEvent，也就是真正添加在obj上的事件，不是之前添加的fun
	if(obj.addEventListener){ 
		// 兼容
		obj.removeEventListener(event,fun,false);
	}else{
		obj.detachEvent("on"+event,fun);
	}
}
// 删除示范：
	// var result1=addEvent(box,"click",fun1);
	// var result2=addEvent(box,"click",fun2);
	// removeEvent(box,"click",result1);

// 封装鼠标滚动事件
	function mousewheel(obj,upFun,downFun){
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",fun);
		}else{
			obj.addEventListener("mousewheel",fun,false);
			obj.addEventListener("DOMMouseScroll",fun,false);
		}
		function fun(e){
			var ev=e||window.event;
			if(ev.returnValue){
				ev.returnValue=false;
			}else{
				ev.preventDefault();
			}
			var num=ev.wheelDelta||ev.detail;
			if(num==120||num==-3){
				upFun.call(obj);
			}else if(num==-120||num==3){
				downFun.call(obj);
			}
		}

	}
	
//13.hover
 function getEvent (e) {
      return e||window.event;
 }
//判断某个元素是否包含有另外一个元素
//2016-08-16-15:30
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
function hover(obj,overfun,outfun) {
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
/********************************/

// cookie
// 设置cookie
function setCookie(attr,value,time){
	if(time){
		//有指定生存周期的cookie
		var now=new Date;
		now.setTime(now.getTime()+time*1000);
		document.cookie=attr+"="+value+";expires="+now.toGMTString();
	}else{
		//临时性的cookie
		document.cookie=attr+"="+value;
	}
}
// 获取cookie的值
function getCookie(attr){
	// 获取所有的cookie
	var cookies=document.cookie;
	// 先把所有cookies分割开
	var arrCookie=cookies.split("; ");
	// 再把每个都分割，判断剑是否相同，相同输出值，不同输出false
	for(var i=0;i<arrCookie.length;i++){
		var brrCookie=arrCookie[i].split("=");
		if(brrCookie[0]==attr){
			return brrCookie[1];
		}
	}
	return false;
}
// 删除cookie
function delCookie(attr){
	var now=new Date();
	now.setTime(now.getTime()-1);
	// 设置一个旧的时间
	document.cookie=attr+"=suibian;expires="+now.toGMTString();
}

// 正则
// 去除函数空格
function delSpace(str,type){
	    type=type||"b";
	    var reg;
		switch(type){
			case"l":reg=/^\s*/g;
			break;
            case"r":reg=/\s*$/g;
            break;
			case"b":reg=/^\s*|\s*$/g;
			break;
			case "a":reg=/\s*/g;
			break;
		}
		return str.replace(reg,"");
}
// 查找字符在字符串中所有下标的集合
function getIndex(str,reg) {
    var arr=[];
    do{
        var result=reg.exec(str);
        if(result){
            arr.push(result);
        }
    }while (result);
    return arr;
}