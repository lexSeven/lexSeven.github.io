// JavaScript Document
test.clickArea={
	drag:function(option){
		var obj = option.obj,ev = option.ev;
		var touch = ev.changedTouches[0];
		obj.style.position = 'absolute';
		var downX = touch.pageX;
		var downY = touch.pageY;
		var objleft = downX - obj.offsetLeft;
		var objtop = downY - obj.offsetTop;
		obj.ontouchmove = document.ontouchmove = function( ev ){
			var ev = ev || event;
			var touch = ev.changedTouches[0];
			obj.style.left = touch.pageX; - objleft + 'px';
			obj.style.top = touch.pageY; - objtop + 'px';
		}
		obj.ontouchend = document.ontouchend = function(){
			 obj.ontouchmove = document.ontouchmove = null;
		}
	},
	close:function( option ){
		var target = option.target;
		removeClass(s(target),'active');
	},
	open:function( option ){
		var target = option.target;
		addClass(s(target),'active');
	}
}