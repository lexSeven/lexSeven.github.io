// JavaScript Document
function addClass(obj,sClass){//添加class样式
	
	var aClass = obj.className.split(' ');
	
	if( !obj.className ){
		
		obj.className = sClass;
		return;
			
	}
	
	for(var i=0; i<aClass.length; i++){
	
		if( aClass[i] === sClass )return;
		
	}
	
	obj.className += ' ' + sClass;	
	
}

function removeClass(obj,sClass){//移除class样式
	
	var aClass = obj.className.split(' ');
	
	if(!obj.className)return;
	
	for(var i=0; i<aClass.length; i++){
	
		if( aClass[i] === sClass ){
		
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			break;
			
		}	
		
	}
	
}

function getByClass(parent, tagname, classname) {//通过Class名字获取元素
	var aEls = parent.getElementsByTagName(tagname);
	var arr = [];
	var re = new RegExp('(^|\\s)'+ classname +'(\\s|$)');
	
	for (var i=0; i<aEls.length; i++) {
		if ( re.test(aEls[i].className) ) {
			arr.push(aEls[i]);
		}
	}
	return arr;
}


function loadImage( Img ) {	//图片按需加载
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	for (var i=0; i<Img.length; i++) {
		if (getTop(Img[i]) < scrollTop + document.documentElement.clientHeight && !Img[i].isLoad ) {
			Img[i].isLoad = true;	
			Img[i].src = Img[i].getAttribute('_src');		
		}
	}
}

	
function getTop(obj) {//获取距离顶部的绝对值
	var iTop = 0;
	while(obj) {
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
}



function getStyle( obj, attr ) {//获取样式数据
	if ( obj.currentStyle ) {
		return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle( obj )[attr];
	}
}


function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function shake( obj, attr, endFn ) {//抖动
	
	if ( obj.bShake ) return;
	obj.bShake = true;
	
	var arr = [];
	var num = 0;
	var pos = parseInt(getStyle(obj, attr));
	
	for (var i=18; i>0; i-=2) {
		arr.push(i, -i);
	}
	arr.push(0);
	
	var timer = setInterval(function() {
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if ( num == arr.length ) {
			clearInterval( timer );
			obj.bShake = false;
			
			endFn && endFn();
		}
	}, 50);
	
}

function bind(obj,ev,fn){//事件绑定
	
	if( obj.addEventListener ){
		
		obj.addEventListener(ev,fn,false);
			
	}else{
		
		obj.attachEvent('on' + ev,function(){
			fn.call(obj);	
		});
		
	}
	
}


function doMove(obj, json, time, fx, fn) {//运动函数
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
	
	var t1 = +new Date();
	
	obj.iTimer = setInterval(function() {
		
		var t = +new Date() - t1;
		if (t >= d) {
			t = d;
		}
		
		for (var attr in json) {
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




var Tween = {//运动形式
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}