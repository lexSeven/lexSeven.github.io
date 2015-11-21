// JavaScript Document
test.clickArea={
	drag:function(option){
		var obj = option.obj,ev = option.ev;
		obj.style.position = 'absolute';
		var downX = ev.clientX;
		var downY = ev.clientY;
		var objleft = downX - obj.offsetLeft;
		var objtop = downY - obj.offsetTop;
		obj.onmousemove = document.onmousemove = function( ev ){
			var ev = ev || event;
			obj.style.left = ev.clientX - objleft + 'px';
			obj.style.top = ev.clientY - objtop + 'px';
		}
		obj.onmouseup = document.onmouseup = function(){
			 obj.onmousemove = document.onmousemove = null;
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