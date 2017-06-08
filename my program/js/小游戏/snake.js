function snakeGame(box){
	// 要多次使用的值放在构造函数中，放在下面局部环境使用受限。初始化
	this.box=box;
	this.food={x:0,y:0};
	this.snake=[{x:0,y:0},{x:1,y:0},{x:2,y:0}];
	this.way="right";
	// this.newhead={x:0,y:0};
	this.t=0;
}
snakeGame.prototype={
	// 1.面向对象的写法,首先，运行原型链中的play方法，play方法里，运行draw,getFood,getSnake,move,control。
	play:function(){
		this.draw();
		this.getFood();
		this.getSnake();
		this.move();
		this.control();
	},
	draw:function(){
		// 2.先在页面中创建400个盒子，用的棋盘思想，给每个盒子一个定位，定位同时赋给她自己的id.
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				//每循环一次创建一个div，i是x轴，j是y轴。
				var ever=$("<div>");
				ever.id=j+"-"+i;
				// id在css中不能这么写，数字链接的这种写法，但是在js中可以获取到。
				// ever.innerHTML=j+"-"+i;
				this.box.appendChild(ever);
				// 把创建的这个div添加到页面中
			}
		}
	},
	getFood:function(){
		// 3.进入/刷新页面时，随机地给一个食物。
		// 食物的坐标是随机给的数字，先随机获取这两个数字，然后把这两个值保存在函数中（通过创建对象来保存值：给对象添加属性，然后给属性赋值），同时这个坐标也可以得到盒子的id，通过加类名，改变这个盒子的样式，让它成为"food"
		// 4.食物不能和贪吃蛇蛇身重复，所以创建函数检测。
		do{
			var foodx=Math.floor(Math.random()*20);
			var foody=Math.floor(Math.random()*20);
			// 先执行一次，然后判断这个值是否符合，如果不符合，再进入循环重新获取值
		}while(this.checkold(foodx,foody))	
		this.food.x=foodx;
		this.food.y=foody;	
		console.log(this);
		// 这步就是获取那个位置的盒子，然后给盒子加上food样式（通过加类名的方式）
		var objfood=$("#"+foodx+"-"+foody);	
		objfood.className="food";
	},
	
	getSnake:function(){
		// 5.创建蛇身，进入页面先自定了三个坐标，值在上面函数中this.snake里写着，里面三个对象，用数组连接。
		for(var i=0;i<this.snake.length;i++){
			// 循环出所有的坐标值，找出相对应的div,给div上加上snake样式
			var objsnake=$("#"+this.snake[i].x+"-"+this.snake[i].y);
			objsnake.className="snake";
		}
	},
	move:function(){
		// 6.移动，进来先自定义移动轨迹this.way="right"。先写向右移动
		// 向右移动时，头x轴加一，占据前面的盒子，尾部的删除即可实现盒子向右运动一次。通过不断重复这个动作，增加时间函数，盒子一直向右跑。
		// 做的时候先获取这个新头的x轴和y轴，找到所在的盒子，加上样式，在这同时要注意把新添加的这个盒子相关的坐标存在对象this.snake中，方便之后使用。
		// 只要涉及到环境变化，注意this指针。
		// 加上头后再去除尾部，将尾部的坐标获取到，然后将这个坐标所在的div上存在的snake样式删除。
		// 做完向右，向下就是新增的头是y轴加一，占据下面盒子，删除最后面。其余同理。
		var that=this;
		this.t=setInterval(function(){
			switch(that.way){
				case "right":
				// 
					var newheadx=that.snake[that.snake.length-1].x+1;
					var newheady=that.snake[that.snake.length-1].y;			
				break;
				case "bottom":
					var newheadx=that.snake[that.snake.length-1].x;
					var newheady=that.snake[that.snake.length-1].y+1;	
				break;
				case "left":
					var newheadx=that.snake[that.snake.length-1].x-1;
					var newheady=that.snake[that.snake.length-1].y;
				break;
				case "top":
					var newheadx=that.snake[that.snake.length-1].x;
					var newheady=that.snake[that.snake.length-1].y-1;	
				break;
			}
			var newhead=$("#"+newheadx+"-"+newheady);
			// 8.增加游戏失败的判断：如果新对象为null，也是就蛇身x轴或y轴超出边界，没有这个div可加样式，这时蛇身碰到盒子边，游戏结束。
			// 9.检测蛇头碰到蛇身任意一个位置，游戏结束。
			if(newhead==null||that.checkold(newheadx,newheady)){
				console.log(newheadx,newheady);

				// console.log(that.checkold(newheadx,newheady));
				alert("拜拜");
				clearInterval(that.t);
				return;
			};
			// 如果蛇身没有碰到边界，这时给蛇头添加样式。
			newhead.className="snake";
			// 注意新蛇头的值要存入上面对象中
			that.snake.push({x:newheadx,y:newheady});
			// 10.增加吃到食物判断：如果蛇头x轴和食物的x轴相同，也就是两个占了同一个div,这时只增加蛇头，不删除蛇尾。
			if(newheadx==that.food.x&&newheady===that.food.y){
				that.getFood();

			}else{
				// 没吃到食物或普通运动，就是正常的方式运动，每一次运动开头加，结尾减。
				var oldend=that.snake.shift();
				var objoldend=$("#"+oldend.x+"-"+oldend.y);
				objoldend.className="";
			}
		},200);
		
	},
	checkold:function(a,b){
		// 检测，所有的蛇身的坐标和传入的数值不同
		for(var i=0;i<this.snake.length;i++){
			if(this.snake[i].x===a&&this.snake[i].y===b){
				return true;
			}
		}
		return false;
	},
	control:function(){
		// 7.键盘控制方向，获取按键的码，然后执行不同的方向。但是左右、上下不能依次执行，所以加入判断。
		var that=this;
		window.onkeydown=function(e){
			var ev=e||window.event;
			var objev=ev.keyCode;
			switch(objev){
				case 37:
					if(that.way=="right"){
						return;
					}
						that.way="left";
				break;
				case 38:
					if(that.way=="bottom"){
						return;
					}
						that.way="top";
				break;
				case 39:
					if(that.way=="left"){
						return;
					}
						that.way="right";
				break;
				case 40:
					if(that.way=="top"){
						return;
					}
						that.way="bottom";	
				break;
			}
		}
	}	
}





  

