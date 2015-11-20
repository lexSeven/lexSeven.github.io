String.prototype.findNum = function(){
	return this.match(/\d+/g);
}
/**
 * Created by qnbmhgjytu on 15/6/5.
 */

/**
 * Created by qnbmhgjytu on 15/6/5.
 */
function s(obj) {
    return document.getElementById(obj);
};

function sClass( obj ){
    return document.querySelector( obj )
};

function bind(obj, ev, fn) { //事件绑定
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

function addClass(obj, sClass) { //添加class样式
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}


function removeClass(obj, sClass) { //移除class样式
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function hasClass(obj, sClass) { //添加class样式
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        return false;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return true;
    }
    return false;
}

function getByClass(parent, tagname, classname) { //通过Class名字获取元素
    var aEls = parent.getElementsByTagName(tagname);
    var arr = [];
    var re = new RegExp('(^|\\s)' + classname + '(\\s|$)');
    for (var i = 0; i < aEls.length; i++) {
        if (re.test(aEls[i].className)) {
            arr.push(aEls[i]);
        }
    }
    return arr;
}


function lexIndex( obj ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            return i;
        }
    };
};

function lexPrevAll( obj,off ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            off?children.splice(i+1):children.splice(i)
        }
    };
    return children;
};

function lexNextAll( obj,off ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            off?children.splice(0, i):children.splice(0, i+1);
        }
    };
    return children;
};

function lexSibling( obj ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            children.splice(i, 1);
        }
    };
    return children;
};

function lexChildren( elem ){

    var elem_child = elem.childNodes;
    var child = [];

    for(var i=0; i<elem_child.length;i++){

        if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {

            elem.removeChild(elem_child[i])

        }else{
            child.push(elem_child[i]);
        }

    }

    return child;
}

function remove( obj ){
	obj.parentNode.removeChild( obj );
}

function getByParent(obj, tagname, classname) { // 通过父级的className以及tagName获取元素
    var re = new RegExp('(^|\\s)' + classname + '(\\s|$)');
    while (obj.parentNode) {
        if(obj.parentNode.tagName != tagname){
            obj = obj.parentNode;
        }else{
            if (re.test(obj.parentNode.className)) {
                return obj.parentNode;
            }else{
                obj = obj.parentNode;
            }
        }

    }
}

function getNums(){
    var arr = [];
    for(var i=0;i<arguments.length;i++){
        arr = arr.concat(getNum( {num:arguments[i].num,min:arguments[i].min,max:arguments[i].max} ));
    }
    return arr.sort(randomsort);
}

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function getNum( option ){

    var min = option.min || 0;
    var num = option.num;//随机数个数
    var max = option.max;//随机数最大值
    var sort = option.sort;//是否排序  '>'：从大到小排序   '<'：从小到大排序  不传则不排序

    var arr = []; //[10,20]
    var json = {}; //{'10':1,'20':1}   10

    while( arr.length < num ){

        var iNum =  Math.round( Math.random()*max );

        if( !json[iNum] && iNum > min ){

            arr.push( iNum );
            json[iNum] = 1;
            //必须是一个真值，否则过滤不掉重复的数字。
        }

    }

    if(sort=='>'){
        arr.sort( function(a,b){ return b - a; } );
        return arr;
    }else if(sort=='<'){
        arr.sort( function(a,b){ return a - b; } );
        return arr;
    }else{
        return arr;
    }
    //
    //return arr.length;
}

function stopPP(obj) { //阻止点击事件冒泡
    bind(obj, 'touchstart', function(ev) {
        var ev = ev || event;
        //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
    });
};



function startMove(obj,json,times,fx,fn){
	
	if( typeof times == 'undefined' ){
		times = 400;
		fx = 'linear';
	}
	
	if( typeof times == 'string' ){
		if(typeof fx == 'function'){
			fn = fx;
		}
		fx = times;
		times = 400;
	}
	else if(typeof times == 'function'){
		fn = times;
		times = 400;
		fx = 'linear';
	}
	else if(typeof times == 'number'){
		if(typeof fx == 'function'){
			fn = fx;
			fx = 'linear';
		}
		else if(typeof fx == 'undefined'){
			fx = 'linear';
		}
	}
	
	var iCur = {};
	
	for(var attr in json){
		iCur[attr] = 0;
		
		if( attr == 'opacity' ){
			iCur[attr] = Math.round(getStyle(obj,attr)*100);
		}
		else{
			iCur[attr] = parseInt(getStyle(obj,attr));
		}
		
	}
	
	var startTime = now();
	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		
		var changeTime = now();
		
		var t = times - Math.max(0,startTime - changeTime + times);  //0到2000
		
		for(var attr in json){
			
			var value = Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
			
			if(attr == 'opacity'){
				obj.style.opacity = value/100;
				obj.style.filter = 'alpha(opacity='+value+')';
			}
			else{
				obj.style[attr] = value + 'px';
			}
			
		}
		
		if(t == times){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj);
			}
		}
		
	},13);
	
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}
	
	function now(){
		return (new Date()).getTime();
	}
	
}


var Tween = {
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

