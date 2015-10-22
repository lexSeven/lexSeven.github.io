// JavaScript Document

function getByClass( sClass,parent ){
		
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];
	
	for(var i=0; i<aEles.length; i++){
		
		var aClass = aEles[i].className.split(' ');
	
		for(var j=0; j<aClass.length; j++){
			
			if( aClass[j] == sClass ){
				
				arr.push( aEles[i] );
				break;
				
			}	
			
		}
		
	}
	
	return arr;
	
}

function startMove(obj, json, fn) {
clearInterval(obj.iTimer);
var iCur = 0;
var iSpeed = 0;
	
obj.iTimer = setInterval(function() {
	
	var iBtn = true;
				
	for ( var attr in json ) {
						
		var iTarget = json[attr];
		
		if (attr == 'opacity') {
			iCur = Math.round(css( obj, 'opacity' ) * 100);
		} else {
			iCur = parseInt(css(obj, attr));
		}
		
		iSpeed = ( iTarget - iCur ) / 8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if (iCur != iTarget) {
			iBtn = false;
			if (attr == 'opacity') {
				obj.style.opacity = (iCur + iSpeed) / 100;
				obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		
	}
	
	if (iBtn) {
		clearInterval(obj.iTimer);
		fn && fn.call(obj);
	}
	
}, 30);
}

function doMove(obj, json, time, fx, fn) {
		clearInterval(obj.iTimer);
		var fx = fx || 'linear';
		var d = time || 1000;
		
		var j = {}
		
		for (var attr in json) {
			j[attr] = {};
			if (attr == 'opacity') {
				j[attr].b = Math.round(css(obj, attr) * 100);
			} else {
				j[attr].b = parseInt(css(obj, attr));
			}
			
			j[attr].c = json[attr] - j[attr].b;
		}
		
		/*j = {
			width : {
				b : 100
			},
			height : {
				b : 200
			}
		}*/
		
		//console.log(j);
		
		var t1 = +new Date();
		
		obj.iTimer = setInterval(function() {
			
			var t = +new Date() - t1;
			if (t >= d) {
				t = d;
			}
			
			for (var attr in json) {
				//定时器没开启一次，分别把要运动属性当前的值计算并赋值
				var v = Tween[fx](t, j[attr].b, j[attr].c, d);
				
				if (attr == 'opacity') {
					obj.style.opacity = v / 100;
					obj.style.filter = 'alpha(opacity='+v+')';
				} else {
					obj.style[attr] = v + 'px';
				}
			}
			
			if (t == d) {
				clearInterval(obj.iTimer);
				fn && fn();
			}
			
		}, 30);
	}

function getStyle(obj,attr)
{
	if( obj.currentStyle){
		return obj.currentStyle[attr]||1;	
	}
	return getComputedStyle(obj)[attr];	
}

function opacity(obj , num , target , endFn) {
	
	var iCur = getStyle(obj, 'opacity');
	iCur = Math.floor( iCur * 100 );
	
	num = iCur < target ? Math.abs(num) : -Math.abs(num);
	
	clearInterval( obj.alpha );
	
	obj.alpha = setInterval(function() {
		
		iCur = getStyle(obj, 'opacity')*100 + num;
		
		if ( iCur < target && num < 0 || iCur > target && num > 0 ) {
			iCur = target;
		}

		obj.style.opacity = iCur/100;
		obj.style.filter = 'alpha(opacity:'+iCur+')';
		
		if ( iCur == target ) {
			clearInterval( obj.alpha );
			endFn && endFn();
		}
		
	}, 20);
}

function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}



function move( obj , W , H , ratio ){
	obj.oLeft = obj.oLeft || obj.offsetLeft;
	obj.oTop = obj.oTop || obj.offsetTop;
	obj.style.left = obj.oLeft + 50 - W*ratio + 'px';
	obj.style.top = obj.oTop + 30 - H*ratio + 'px';
};

function boxmove( obj , W , H , ratio ){
	obj.style.left = 50 - W*ratio + 'px';
	obj.style.top = 0 - H*ratio + 'px';
};


function getNum(){
	
	var arr = []; //[10,20]
	var json = {}; //{'10':1,'20':1}   10

	while( arr.length < 100 ){
		
		var iNum =  Math.round( Math.random()*1000 );
		
		if( !json[iNum] ){
		
			arr.push( iNum );
			json[iNum] = 1;
			//必须是一个真值，否则过滤不掉重复的数字。
		
		}
		
	}
	
	arr.sort( function(a,b){ return a - b; } );
	//return arr.length;
	return arr;

}

function drug( ev , obj , name , fn){
		
		var ev = ev || event;
		
		var disX = ev.clientX - obj.offsetLeft;
		var disY = ev.clientY - obj.offsetTop;
	
		/*var oDiv = document.createElement('div');
		oDiv.className = 'shaw';
		oDiv.style.left = this.offsetLeft - 2 + 'px';
		oDiv.style.top = this.offsetTop - 2 + 'px';
		document.body.appendChild(oDiv);*/
	
		var oDiv = obj.cloneNode(true);
		oDiv.id = '';
		oDiv.className = name;
		oDiv.style.left = obj.offsetLeft + 'px';
		oDiv.style.top = obj.offsetTop + 'px';
		oDiv.style.zIndex = 9;
		document.body.appendChild(oDiv);
		
		bind(document,'mousemove',function(ev){
			
			var ev = ev || event;
			var l = ev.clientX - disX;
			var t = ev.clientY - disY;
			
			oDiv.style.cursor = 'default';
			oDiv.style.left = l + 'px';
			oDiv.style.top = t + 'px';			
			
		});	
		
		document.onkeydown = function(ev){
			
			var ev = ev || event;
			
			if( ev.keyCode == 27 ){
			
				document.body.removeChild(oDiv);
				document.onmousemove = document.onmouseup =document.onkeydown = null;
			
			}
			
		};
		
		document.onmouseup = function(){
			
			document.onmousemove = document.onmouseup = null;
			
			obj.style.left = oDiv.offsetLeft + 'px';
			obj.style.top = oDiv.offsetTop + 'px';
			
			document.body.removeChild(oDiv);
			fn&&fn();
		};
		
		return false;
		
	};
	
function bind(obj,ev,fn){
	
	if( obj.addEventListener ){
		
		obj.addEventListener(ev,fn,false);
			
	}else{
		
		obj.attachEvent('on' + ev,function(){
			fn.call(obj);	
		});
		
	}
	
}



function Scroll( oBox , oBoxm , Text , Textm ){
	
	var maxH = Text.clientHeight - Textm.scrollHeight;
	
	//alert( oBox.offsetHeight/oDiv3.scrollHeight );
	var n = Text.offsetHeight/Textm.scrollHeight*oBox.offsetHeight;
	if(n>oBox.offsetHeight)n = oBox.offsetHeight;
	oBoxm.style.height = n + 'px';
	
	var maxTop = oBox.offsetHeight - oBoxm.offsetHeight;

	var t = 0;
	
	drag( oBoxm );
	
		
	bind(oBox,'mousewheel',fnScroll);
	bind(oBox,'DOMMouseScroll',fnScroll);
		
	bind(Text,'mousewheel',fnScroll);
	bind(Text,'DOMMouseScroll',fnScroll);
	
	
	function fnScroll(ev){
		
		var ev = ev || event;
		var bDown = true; // true : 向下   false : 向上
		//先假设是向下滚动鼠标的。
		
		if( ev.wheelDelta ){
			
			bDown = ev.wheelDelta > 0 ? false : true;
			
		}else{
			
			bDown = ev.detail > 0 ? true : false;
			
		}
	
		//bDown ? alert('向下滚动了滚轮') : alert('向上滚动了滚轮');
		
		if(bDown){
			
			t += 10;
			if(t>maxTop)t = maxTop;
						
		}else{
			
			t -= 10;
			if(t<0) t = 0;
			
		}
		
		var scale = t/maxTop;
		var iTop = scale * maxH;
						
		oBoxm.style.top = t + 'px';	
		Textm.style.top = iTop + 'px';	
		
		if( ev.preventDefault ){
			ev.preventDefault();		
		}
		
	}
	
	
	function bind(obj,ev,fn){
		
		if(obj.addEventListener){
			obj.addEventListener(ev,fn,false);	
		}else{
			obj.attachEvent('on'+ev,function(){
				fn.call(obj);	
				return false; //取消事件的默认行为
			});	
		}
		
	}
			
	
	function drag( obj ){
		
		obj.onmousedown = function(ev){
			
			var ev = ev || event;
			var disY = ev.clientY - obj.offsetTop;
						
			document.onmousemove = function	(ev){
				
				var ev = ev || event;
				
				t = ev.clientY - disY;
				
				if(t<0) t = 0;
				if(t>maxTop)t = maxTop;
				
				var scale = t/maxTop;
				var iTop = scale * maxH;
								
				obj.style.top = t + 'px';	
				Textm.style.top = iTop + 'px';			
												
			}
			
			document.onmouseup = function(){
				
				document.onmousemove = document.onmouseup =  null;
				
			};
			
			return false;
		};
		
	}
	
	
	/*
	
		ev.preventDefault() : 
		
			取消通过 addEventListener 绑定的事件的默认行为。
			
	
		attachEvent : 取消默认行为 return false;
	
	
	
	*/
	
			
};