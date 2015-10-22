// JavaScript Document
/*---------------------------拓展内置方法----------------------
String.prototype.trim=function(){//去掉首尾空格
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){//去掉首空格
  return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){//去掉尾空格
  return this.replace(/(\s*$)/g,"");
}
String.prototype.num=function(){//去掉数字
  return this.replace(/\d+/g,"");
}

Object.prototype.lexGetTop=function() { //获取距离顶部的绝对值
    var iTop = 0; //声明一个变量用来存临时数据
	var obj = this;
    while (obj) { //循环 如果obj存在 那麽做接下来的事情
        iTop += obj.offsetTop; //把当前元素距离顶部距离父级顶部的距离存下来
        obj = obj.offsetParent; //obj等于它自己的父级  这样不管传进来的元素有多少个父级   都可以获取到距离顶部的绝对距离
    }
    return iTop; //最后当obj的父级不存在的时候返回值
}

Object.prototype.lexGetNumber = function( number ){
	return Math.ceil( Math.random()*number)
}


Object.prototype.lexGetLeft=function() { //获取距离左边的绝对值
    var iLeft = 0;
	var obj = this;
    while (obj) {
        iLeft += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return iLeft;
}

Object.prototype.lexGetView = function(){
	return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

Object.prototype.lexGetOffset = function(){
	return {
        w: document.body.offsetWidth,//网页可见区域高
        h: document.body.offsetHeight//网页可见区域高
    };
}

Object.prototype.lexGetScroll = function(){
	return {
        t: document.body.scrollTop || document.documentElement.scrollTop,//滚动距离
        h: document.body.scrollHeight//网页正文全文高
    };
}

Object.prototype.lexStyle = function(attr,value){
	if(value){
		return this.style[attr] = value;
	}else{
		if (this.currentStyle) {
			return parseInt(this.currentStyle[attr]);
		} else {
			return parseInt(getComputedStyle(this)[attr]);
		}
	}
}

Object.prototype.s = function( data ){
	if(data.indexOf('#')!=-1){
		return document.getElementById(obj);
	};
}


Object.prototype.lexStop = function( type , distance , maxHeight ){
	var obj = this;
	if(type == 'top'){
		
	}else{
		bind(window,'scroll',function(){
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			obj.Top = obj.Top || getTop(obj);
			obj.Left = getLeft(obj);
			obj.itop = obj.itop || obj.offsetTop;
			obj.ileft = obj.ileft || obj.offsetLeft;
			obj.Height = obj.Height || obj.offsetHeight;
			if (scrollTop > (maxHeight - distance + obj.Height) ) {
				obj.style.position = 'static';
			}
			if (scrollTop < maxHeight - distance + obj.Height) {
				obj.style.top = distance - obj.Height + 'px';
				obj.style.left = obj.ileft + 'px';
				obj.style.position = 'fixed';
			};	
		});
	}
}

/*-----------------------------拓展内置方法----------------------------------*/

/*-----------------------路径变量------------------------------*/
var basePath = "/web/default/"
/*-----------------------路径变量------------------------------*/

function lex(){};

function s(obj) {
    return document.getElementById(obj);
};

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

function loadImage(Img) { //图片按需加载
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = 0; i < Img.length; i++) {
        if (getTop(Img[i]) < scrollTop + document.documentElement.clientHeight && !Img[i].isLoad) {
            Img[i].isLoad = true;
            Img[i].src = Img[i].getAttribute('_src') || Img[i].src;
        }
    }
}

function dragAndDrop( obj ) {
	
	bind(obj , 'mousedown' , function( ev ){
		var e = ev || event;
		var target = e.target || e.srcElement;
		if(target.getAttribute('_function') == 'drag'){
			var disX = ev.clientX - obj.offsetLeft;
			var disY = ev.clientY - obj.offsetTop;
			document.onmousemove = function(ev) {
				var ev = ev || event;
				obj.style.top = ev.clientY - disY + (obj.offsetHeight/2) + 'px';
				obj.style.left = ev.clientX - disX + (obj.offsetWidth/2) + 'px';
				return false;
			}
			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
			};
			return false;
		};
	})

}

/*$.fn.extend({

drag : function(){
	var disX = 0;
	var disY = 0;
	var This = this;
	this.mousedown(function(ev){
		disX = ev.pageX - $(this).offset().left;
		disY = ev.pageY - $(this).offset().top;
		$(document).mousemove(function(ev){
			This.css('left' , ev.pageX - disX);
			This.css('top' , ev.pageY - disY);
		});
		$(document).mouseup(function(){
			$(this).off();
		});
		return false;
	});
},

getShort : function(){

	var index = 0;
    var ih = $(this).eq(0).outerHeight();
	$(this).each(function(i,elem){   //一参：下标 二参 : 每个元素

		$(elem).outerHeight() > ih;
		index = $(elem).eq();

	});
    return index;
},

});*/


function getShort(obj) { //获取一组元素中好高度最小的一个并返回一个索引值
    var index = 0;
    var ih = obj[index].offsetHeight;
    for (var i = 1; i < obj.length; i++) {
        if (obj[i].offsetHeight < ih) {
            index = i;
            ih = obj[i].offsetHeight;
        }
    }
    return index;
}

function getHeight(obj) { //获取一组元素中高度最大的一个并返回一个索引值
    var index = 0;
    var ih = obj[index].offsetHeight;
    for (var i = 1; i < obj.length; i++) {
        if (obj[i].offsetHeight > ih) {
            index = i;
            ih = obj[i].offsetHeight;
        }
    }
    return index;
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


function getByName(parent, tagname, name) { //通过Class名字获取元素
    var aEls = parent.getElementsByTagName(tagname);
    var arr = [];
    var re = new RegExp('(^|\\s)' + name + '(\\s|$)');
    for (var i = 0; i < aEls.length; i++) {
        if (re.test(aEls[i].name)) {
            arr.push(aEls[i]);
        }
    }
    return arr;
}

function getTop(obj) { //获取距离顶部的绝对值
    var iTop = 0; //声明一个变量用来存临时数据
    while (obj) { //循环 如果obj存在 那麽做接下来的事情
        iTop += obj.offsetTop; //把当前元素距离顶部距离父级顶部的距离存下来
        obj = obj.offsetParent; //obj等于它自己的父级  这样不管传进来的元素有多少个父级   都可以获取到距离顶部的绝对距离
    }
    return iTop; //最后当obj的父级不存在的时候返回值
}

function stopTop(obj, distance, maxHeight) { //吸顶效果  obj 需要吸顶的元素  distance(可不传)距离顶部多少距离时吸顶 默认为0  maxHeight(可不传) 最大高度 滚动到多少距离时停止吸顶
	bind(window,'scroll',function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var distance = distance || 0;
		obj.Top = obj.Top || getTop(obj);
		obj.Left = getLeft(obj);
		obj.itop = obj.itop || obj.offsetTop;
		obj.ileft = obj.ileft || obj.offsetLeft;
		obj.Height = obj.Height || obj.offsetHeight;
	
		if (obj.Top - scrollTop < distance) {
			obj.style.position = 'fixed';
			obj.style.left = obj.parentNode.offsetLeft + 1000 - obj.offsetWidth + 'px';
			obj.style.top = distance + 'px';
		} else if (scrollTop < obj.Top) {
			//obj.style.top = obj.itop + 'px';
			//obj.style.left = obj.ileft + 'px';
			obj.style.position = 'static';
		};
		if (!maxHeight) return;
		if (scrollTop > maxHeight - obj.Height) {
			obj.style.top = maxHeight - obj.Height + 'px';
			obj.style.left = obj.ileft + 'px';
			obj.style.position = 'absolute';
		};	
	});
	bind(window,'resize',function(){
		obj.style.left = obj.parentNode.offsetLeft + 1000 - obj.offsetWidth + 'px';
	});
};

function stopBottom(obj , type , distance , maxHeight ){
	if(type == 'top'){
		
	}else{
		bind(window,'scroll',function(){
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			obj.Top = obj.Top || getTop(obj);
			obj.Left = getLeft(obj);
			obj.itop = obj.itop || obj.offsetTop;
			obj.ileft = obj.ileft || obj.offsetLeft;
			obj.Height = obj.Height || obj.offsetHeight;
			if (scrollTop > (maxHeight - distance + obj.Height) ) {
				obj.style.position = 'static';
			}
			if (scrollTop < maxHeight - distance + obj.Height) {
				obj.style.top = distance - obj.Height + 'px';
				obj.style.left = obj.ileft + 'px';
				obj.style.position = 'fixed';
			};	
		});
	}
}

function getLeft(obj) { //获取距离左边的绝对值
    var iLeft = 0;
    while (obj) {
        iLeft += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return iLeft;
}

function getStyle(obj, attr) { //获取样式数据
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr];
    }
}

function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function shake(obj, attr, endFn) { //抖动
    if (obj.bShake) return;
    obj.bShake = true;
    var arr = [];
    var num = 0;
    var pos = parseInt(getStyle(obj, attr));
    for (var i = 18; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);
    var timer = setInterval(function() {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if (num == arr.length) {
            clearInterval(timer);
            obj.bShake = false;
            endFn && endFn();
        }
    }, 50);
}

function bind(obj, ev, fn) { //事件绑定
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function removeEvent( obj, ev, fn){//事件取消
	if (obj.addEventListener) {
        obj.removeEventListener(ev, fn, false);
    } else {
        obj.detachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function stopPP(obj) { //阻止点击事件冒泡
    bind(obj, 'click', function(ev) {
        var ev = ev || event;
        //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
    });
};

function allowPP(obj) { //允许点击事件冒泡
    bind(obj, 'click', function(ev) {
        var ev = ev || event;
        //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = false;
    });
};

function ajax(method, url, data, success){//ajax异步处理函数
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (method == 'get' && data) {
        url += data ;
    }

    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send( data );
    }

    xhr.onreadystatechange = function() {

        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                alert('出错了,Err：' + xhr.status);
            }
        }

    }
}

function doMove(obj, json, time, fx, fn){//运动函数
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
            var v = tween[fx](t, j[attr].b, j[attr].c, d);
            if (attr == 'opacity') {
                obj.style.opacity = v / 100;
                obj.style.filter = 'alpha(opacity=' + v + ')';
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

var tween = { //运动形式
    linear: function(t, b, c, d) { //匀速
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) { //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function(t, b, c, d) { //加速减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d) { //加加速曲线
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function(t, b, c, d) { //减减速曲线
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158; //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}

function scrollLine(oBox, oBoxm, Text, Textm, speed , fn) { //自定义滚动条
    var maxH = Text.clientHeight - Textm.scrollHeight;
	if(maxH>0)return;
    //alert( oBox.offsetHeight/oDiv3.scrollHeight );
    var n = Text.offsetHeight / Textm.scrollHeight * oBox.offsetHeight;
    if (n > oBox.offsetHeight) n = oBox.offsetHeight;
    oBoxm.style.height = n + 'px';
    var maxTop = oBox.offsetHeight - oBoxm.offsetHeight;
    var t = oBoxm.offsetTop;
	var speed = speed || 10;
    drag(oBoxm);
	
    bind(oBox, 'mousewheel', fnScroll);
    bind(oBox, 'DOMMouseScroll', fnScroll);
    bind(Text, 'mousewheel', fnScroll);
    bind(Text, 'DOMMouseScroll', fnScroll);

    function fnScroll(ev) {
        var ev = ev || event;
        var bDown = true; // true : 向下   false : 向上
        //先假设是向下滚动鼠标的。
        if (ev.wheelDelta) {
            bDown = ev.wheelDelta > 0 ? false : true;
        } else {
            bDown = ev.detail > 0 ? true : false;
        }
        //bDown ? alert('向下滚动了滚轮') : alert('向上滚动了滚轮');
        if (bDown) {
            t += speed;
            if (t > maxTop){ 
				t = maxTop-1;
				if(fn){
					removeEvent(oBox, 'mousewheel', fnScroll);
					removeEvent(oBox, 'DOMMouseScroll', fnScroll);
					removeEvent(Text, 'mousewheel', fnScroll);
					removeEvent(Text, 'DOMMouseScroll', fnScroll);
					fn();	
				}
			}
        } else {
            t -= speed;
            if (t < 0) t = 0;
        }
        var scale = t / maxTop;
        var iTop = scale * maxH;
        oBoxm.style.top = t + 'px';
        Textm.style.top = iTop + 'px';
		
        if (ev.preventDefault) {
            ev.preventDefault();
        }
    }

    function drag(obj) {
        obj.onmousedown = function(ev) {
            var ev = ev || event;
            var disY = ev.clientY - obj.offsetTop;
            document.onmousemove = function(ev) {
                var ev = ev || event;
                t = ev.clientY - disY;
                if (t < 0) t = 0;
                if (t > maxTop) {
					t = maxTop; 
					if(fn){
						removeEvent(oBox, 'mousewheel', fnScroll);
						removeEvent(oBox, 'DOMMouseScroll', fnScroll);
						removeEvent(Text, 'mousewheel', fnScroll);
						removeEvent(Text, 'DOMMouseScroll', fnScroll);
						fn();	
					}
				}
                var scale = t / maxTop;
                var iTop = scale * maxH;
                obj.style.top = t + 'px';
                Textm.style.top = iTop + 'px';
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
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

function marquee(id,speed,interval,width,height,direction,active){//无缝滚动幻灯片
var oP=id.getElementsByTagName('p');
var oUl=id.getElementsByTagName('ul')[0];
var oOl=id.getElementsByTagName('ol')[0];
var aLi=oOl.getElementsByTagName('li');
var oLi=oUl.getElementsByTagName('li');
var num=0;
var n = 0;
var oDiv = id.getElementsByTagName('div')[0];
var aSpan = id.getElementsByTagName('span');
//var speed = 50;//滚动速度(数值越大，速度越快)
//var interval = 2000;//切换时间间隔(1000等于1秒)
//var width = 470;//图片宽度(填写图片实际宽度
//var height = 150;//图片高度(填写图片实际高度))
//var direction = 'top';//运动的方向top(上下滚动)或者left(左右滚动)
//var active = 'active';//点击按钮添加的class名字

var timer = null;
oUl.innerHTML+=oLi[0].innerHTML;
aLi[0].className = active;
aSpan[0].style.display = 'block';
timer = setInterval( next, interval);
var olwidth = getStyle(oOl,"width");
if(direction == 'left'){
    oUl.style.width = (oLi.length+1)*width+'px';
}
else {
    oUl.style.width = width+'px';
    width = height;
    speed = speed/2;
};
oOl.style.marginLeft = -parseInt(olwidth)/2 +'px';


oP[1].onclick=next;
oP[0].onclick=prev;

for(var i=0;i<aLi.length;i++){
    aLi[i].index = i;
    aLi[i].onclick = function(){
        for(i=0;i<aLi.length;i++){aLi[i].className = ''; aSpan[i].style.display = 'block'; }
        if(num == 0&&this.index == aLi.length-1){change1(direction)}
        else if(num == aLi.length-1&&this.index == 0){change5(direction)}
        else{num = this.index;change()};
    }
};

id.onmouseover = function(){
    clearInterval(timer);
};
id.onmouseout = function(){
    timer = setInterval( next, interval);
};

function prev(){
    aLi[num].className='';
    aSpan[num].style.display = 'none';
    num--;
    num==-1?change1(direction):change();
};

function next(){
    aLi[num].className='';
    aSpan[num].style.display = 'none';
    num++;
    num==aLi.length?change5(direction):change();
};

function change(){
    aLi[num].className=active;
    aSpan[num].style.display = 'block';
    n = -num*width;
    doMove(oUl, {left:n}, speed , 'easeBothStrong')
};

function change1(dir){
    num=aLi.length;
    n = -num*width;
    oUl.style[dir] = n+'px';
    num=aLi.length-1;
    n = -num*width;
    aLi[num].className=active;
    aSpan[num].style.display = 'block';
    doMove(oUl, {left:n}, speed , 'easeBothStrong')
};

function change5(dir){
    num=aLi.length;
    n = -num*width;
    aLi[0].className=active;
    aSpan[0].style.display = 'block';
    doMove(oUl, {left:n}, speed, 'easeBothStrong', function(){
        num = 0;
        oUl.style[dir] = 0+'px';
    })
};
};

function inputVerify( obj , rules , rules2 , rules3 ){//输入框验证

    obj.onblur = function(){
		if(!obj.value){
			addClass(obj.parentNode,'error');
            return false;
            obj.focus();
		}
        if(rules&&rules.test(obj.value)){
            removeClass(obj.parentNode,'error');
            return true;
        }else if(rules2&&rules2.test(obj.value)){
            removeClass(obj.parentNode,'error');
            return true;
        }else if(rules3&&rules3.test(obj.value)){
            removeClass(obj.parentNode,'error');
            return true;
        }else{
            addClass(obj.parentNode,'error');
            return false;
            obj.focus();
        }
    };
};

function inputVerify2( obj , rules , rules2 , rules3 ){//输入框验证

        if(rules&&rules.test(obj.value)){
            removeClass(obj.parentNode,'error');
            return true;
        }else if(rules2&&rules2.test(obj.value)){
            removeClass(obj.parentNode,'error');
            return true;
        }else if(rules3&&rules3.test(obj.value)){
            removeClass(obj.parentNode,'error');
            return true;
        }else{
            addClass(obj.parentNode,'error');
            return false;
            obj.focus();
        }

};


function drug(ev, obj, name, fn) { //拖拽
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
    bind(document, 'mousemove', function(ev) {
        var ev = ev || event;
        var l = ev.clientX - disX;
        var t = ev.clientY - disY;
        oDiv.style.cursor = 'default';
        oDiv.style.left = l + 'px';
        oDiv.style.top = t + 'px';
    });
    document.onkeydown = function(ev) {
        var ev = ev || event;
        if (ev.keyCode == 27) {
            document.body.removeChild(oDiv);
            document.onmousemove = document.onmouseup = document.onkeydown = null;
        }
    };
    document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
        obj.style.left = oDiv.offsetLeft + 'px';
        obj.style.top = oDiv.offsetTop + 'px';
        document.body.removeChild(oDiv);
        fn && fn();
    };
    return false;
};

function moveIn(ev, obj) { //判断鼠标是否进入元素
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (ev.clientX > getLeft(obj) && ev.clientX < getLeft(obj) + obj.offsetWidth && ev.clientY > getTop(obj) - scrollTop && ev.clientY < getTop(obj) - scrollTop + obj.offsetHeight) {
        return true;
    }
    return false;
};

function backTop(obj) { //返回顶部按钮
	bind(window , 'scroll' , function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		scrollTop > document.documentElement.clientHeight ? doMove(obj, {opacity: 100}, 100) : doMove(obj, {opacity: 0}, 100);
		obj.onclick = function() {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			doMove(obj, {opacity: 0}, 100);
		};
	})
};

function tab(parent, contents, fn) { //选项卡
    var btn = parent.getElementsByTagName('li');
    for (var i = 0; i < btn.length; i++) {
        btn[i].index = i;
		bind(btn[i],'click',function(){
			for (var i = 0; i < contents.length; i++) {
                contents[i].style.display = 'none';
                btn[i].className = '';
            };
            contents[this.index].style.display = 'block';
            this.className = 'active';
            fn && fn();
		});
    };
};
/*选项卡组件开始*/
function tabs(id) {
    this.oParent = document.getElementById(id);
    this.ul = this.oParent.getElementsByTagName('ul')[0];
    this.aInput = this.ul.getElementsByTagName('li');
    this.aDiv = getByClass(this.oParent, 'div', 'contant');
    this.iNow = 0;
}
tab.prototype.init = function() {
    var This = this;
    for (var i = 0; i < this.aInput.length; i++) {
        this.aInput[i].index = i;
        this.aInput[i].onclick = function() {
            This.change(this);
        };
    }
};
tab.prototype.change = function(obj) {
    for (var i = 0; i < this.aInput.length; i++) {
        this.aInput[i].className = '';
        this.aDiv[i].style.display = 'none';
    }
    obj.className = 'active';
    this.aDiv[obj.index].style.display = 'block';
};
tab.prototype.autoPlay = function() {
    var This = this;
    setInterval(function() {
        if (This.iNow == This.aInput.length - 1) {
            This.iNow = 0;
        } else {
            This.iNow++;
        }
        for (var i = 0; i < This.aInput.length; i++) {
            This.aInput[i].className = '';
            This.aDiv[i].style.display = 'none';
        }
        This.aInput[This.iNow].className = 'active';
        This.aDiv[This.iNow].style.display = 'block';
    }, 2000);
};
/*选项卡组件结束*/
function filterInput(input, btn, url, fn) { //文本域输入字符过滤
    if (input.value.length < 1) return false;
    var value = input.value;
    btn.onclick = function() {
        var c = oContent.value.replace(/<|>/g, function(v) {
            if (v == '>') {
                return '&gt;'
            } else {
                return '&lt;'
            }
        });
        ajax('get', url, c, fn);
    };
};

function characterConversion( obj ){//敏感字符转换
	var str = '';
	str=obj.value?obj.value:obj;
	var c = str.replace(/<|>/g, function(v) {
		if (v == '>') {
			return '&gt;'
		} else {
			return '&lt;'
		}
	});
	return c
};

function close(obj) { //关闭按钮
    obj.style.display = 'none';
};

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

function offsetH() {//网页可见区域高
    return document.body.offsetHeight;
}

function scrollH() {//网页正文全文高
    return document.body.scrollHeight;
}

function scrollT() {//滚动距离
    return document.body.scrollTop || document.documentElement.scrollTop;
}

function uniencode(text){//中文转Unicode
	text = escape(text.toString()).replace(/\+/g, "%2B");
	var matches = text.match(/(%([0-9A-F]{2}))/gi);
	if (matches)
	{
	for (var matchid = 0; matchid < matches.length; matchid++)
	{
	var code = matches[matchid].substring(1,3);
	if (parseInt(code, 16) >= 128)
	{
	text = text.replace(matches[matchid], '%u00' + code);
	}
	}
	}
	text = text.replace('%25', '%u0025');
	return text;
}

function utf8(text){//中文转UTF-8
	text = encodeURIComponent(text.toString());
	return text;
}

function choiseDate( obj , type ){//选择年月日 第一个参数是选择框 类型为输入框 用于放置选择到的内容   第二个参数是数据类型  可选择year||month||date  分别对应年、月、日。(两个参数都不可省。。)

	var myTime = new Date();
	var iYear = myTime.getFullYear();
	var str = '';
	var off = true;

	if( type == 'year'){
		year();
	}else if( type == 'month'){
		month();
	}else if( type == 'date'){
		date();
	};

	function year(){
		bind( obj , 'click' , function(){
			if(!off)return;
			for(var i=0;i<100;i++){
				str+='<li>'+ iYear +'年</li>';
				iYear--;
			};
			doSet();
			iYear = myTime.getFullYear();
		});
	};

	function month(){
		bind( obj , 'click' , function(){
			if(!off)return;
			for(var i=0;i<12;i++){
				str+='<li>'+ (i+1) +'月</li>';
			};
			doSet();
		});
	};

	function date(){
		bind( obj , 'click' , function(){
			if(!off)return;
			var num = 0;
			var Month = parseInt(s('month').value);
			if( parseInt(s('year').value)%4==0&&Month==2){
				num = 28;
			}else if(Month==2){
				num = 29;
			}else if(Month==1||Month==3||Month==5||Month==7||Month==8||Month==10||Month==12){
				num = 31;
			}else{
				num = 30;
			}

			for(var i=0;i<num;i++){
				str+='<li>'+ (i+1) +'日</li>';
			};
			doSet();
		});
	};

	function doSet(){
		var ul = document.createElement('ul');
		ul.innerHTML = str;
		str = '';
		obj.parentNode.appendChild(ul);
		off = false;
		doMove(ul, {height:200}, 300, 'easeBothStrong');

		bind( ul , 'click' , function( ev ){
			var e = ev || event;
			var target = e.target || e.srcElement;
			obj.value = target.innerHTML;
		});

		bind( obj , 'blur' , function(){
			doMove(ul, {height:0}, 300, 'easeBothStrong' ,function(){
				obj.parentNode.removeChild(ul);
				off = true;
			});
		});
	};

};

function accessTime( Yea , Mont , Day , type ){
	var minutes = 1000 * 60
	var hours = minutes * 60
	var days = hours * 24
	var years = days * 365
	var t = Date.UTC( Yea , Mont , Day );
	var Class = '';
	if(type == 'minutes'){Class = minutes};
	if(type == 'hours'){Class = hours};
	if(type == 'days'){Class = days};
	if(type == 'years'){Class = years};
	var num = t/Class;
	return num;
};

function getT(){
	var myTime = new Date();
	var iYear = myTime.getFullYear();
	var iMonth = myTime.getMonth()+1;
	var iDate = myTime.getDate();
	var iHours = myTime.getHours();
	var iMin = myTime.getMinutes();
	var iSec = myTime.getSeconds();
	var iMill = myTime.getMilliseconds();
	var t = Date.UTC( iYear , iMonth , iDate , iHours , iMin , iSec , iMill );
	return t;
};

function findNum(str){
	return str.match(/\d+/g);
}

function deleteChild( obj ){
	
	obj.parentNode.removeChild( obj );
	
};

function wait( imgUrl , type ){
	if(type){
		var imgUrl = imgUrl || '../images/loading.gif';
		var div = document.createElement('div');
		var Bg = document.createElement('div');
		div.id = 'Wait';
		Bg.id = 'waitBg'
		Bg.style.cssText = 'position:absolute;z-index:99;top:0;left:0;display:block;width:100%;height:'+ Math.max(offsetH(),scrollH()) +'px;background-color:#000;opacity:0;filter:alpha(opacity=0);';
		div.style.cssText = 'position:absolute;z-index:100;top:0px;left:0px;text-align:center;width:100%;height:100%;';
		div.innerHTML = '<span style="display:inline-block; height:100%; vertical-align:middle;"></span><img src="'+ imgUrl +'" style="vertical-align:middle;"/>'
		document.body.appendChild(div);
		document.body.appendChild(Bg);
		doMove(Bg, {opacity:50}, 500);	
	}else{
		document.body.removeChild(s('Wait'));
		doMove(s('waitBg'), {opacity:0}, 500 , '' , function(){
			document.body.removeChild(s('waitBg'));
		});	
	}
};





