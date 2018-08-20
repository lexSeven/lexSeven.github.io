function $s(option){
    if(typeof option === 'string'){
        return document.querySelector(option);
    }else if(typeof option === 'object'){
        var el = option.el || document;
        if(option.n){
            return el.querySelectorAll(option.s);
        }else{
            return el.querySelector(option.s);
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

function dragAndDrop( obj ) {//拖拽

    bind(obj , 'mousedown' , function( ev ){
        var e = ev || event;
        var target = e.target || e.srcElement;
        if(target.dataset.function == 'drag'){
            var disX = ev.clientX - obj.offsetLeft;
            var disY = ev.clientY - obj.offsetTop;
            document.onmousemove = function(ev) {
                var ev = ev || event;
                obj.style.top = ev.clientY - disY  + 'px';
                obj.style.left = ev.clientX - disX  + 'px';
                return false;
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };
    })

}