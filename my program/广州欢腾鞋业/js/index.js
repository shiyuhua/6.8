// $(function(){
// 	var bannerli=$("li",$(".banner-top")[0]);
// 	console.log(bannerli)
// 	var lunboli=$("li",$(".lunbo")[0]);
// 	console.log(lunboli)
// 	var now=0;
// 	for(var i =0;i<bannerli.length;i++){
// 		lunboli[i].index=i;
// 		lunboli[i].onmouseover=function(){
// 			if(this.index>now||this.index<now){
// 				for(var j=0;j<bannerli.length;j++){
// 					bannerli[j].style.opacity=0;
// 					lunboli[j].className="";
// 				}
// 				animate(bannerli[this.index],{opacity:1},500);
// 				this.className="one";
// 			}else if(this.index==now){
// 				return;
// 			}
// 			now=this.index;
			
// 		}
// 	}
// })
$(document).ready(function(){
	var now=0;
	var flag=true;
	$("ul.lunboul li").mouseover(function(){
		if(flag){
			flag=false;
		}
			var next =$(this).index();
			$("ul.lunboul li").eq(now).removeClass();
			$(this).addClass("one");
			$("ul.bannerul li").eq(now).animate({opacity:0},200)
			$("ul.bannerul li").eq($(this).index()).animate({opacity:1},200,function(){
				flag=true
			})
			now=next;
			
			
	})
})


