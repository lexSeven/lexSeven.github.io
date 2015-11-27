// JavaScript Document
var test = {
	/*初始化*/
	int:function(){
		var _this = test;
		_this.bindevent();
	},
	/*绑定事件*/
	bindevent:function(){
		var _this = test;
		bind(document,'touchstart',function( ev ){
			var ev = ev || event;
			var target = ev.target || srcElement;
			for(b in target.dataset){
				if(_this.clickArea[b]){
					_this.clickArea[b]({obj:target,ev:ev,target:target.dataset[b]});
				}
			}
		});
	}
};

test.int();

/*---------------------工具函数------------------------------*/
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


function bind(obj, ev, fn) { //事件绑定
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}