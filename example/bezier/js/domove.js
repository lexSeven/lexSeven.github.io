function css(obj,attr,val){
    if(arguments.length == 3){
        obj.style[attr] = val + 'px';
    }else {
        return getComputedStyle(obj)[attr];
    }
}

function doMove(option){
    /*{
        obj:  运动的对象
        attr: 要运动的属性
        target: 运动的目标
        duration: 运动的时间
        fx: 运动的形式
        fn: 回调函数（运动完了之后调用的函数）
    }*/

    var start = parseInt(css(option.obj,option.attr));
    var distance = option.target - start;//运动的距离
    var time = Date.now();
    var timer = 'timer' + option.attr;
    if(option.obj[timer]){
        return false;
    }
    var fx = option.fx || 'linear';
    option.obj[timer] = setInterval(function(){
        var newTime = Date.now() - time;
        var value = Tween[fx](newTime,start,distance,option.duration);
        css(option.obj,option.attr,value);
        if(newTime > option.duration) {
            option.obj[timer] = null;
            css(option.obj,option.attr,option.target);
            option.fn && option.fn();
            clearInterval(timer);
        }
    });
}

function doMoveRequest(option){
    /*{
        obj:  运动的对象
        attr: 要运动的属性
        target: 运动的目标
        duration: 运动的时间
        fx: 运动的形式
        fn: 回调函数（运动完了之后调用的函数）
    }*/

    var start = parseInt(css(option.obj,option.attr));
    var distance = option.target - start;//运动的距离
    var time = Date.now();

    var fx = option.fx || 'linear';
    function move(){
        var newTime = Date.now() - time;
        var value = Tween[fx](newTime,start,distance,option.duration);
        css(option.obj,option.attr,value);
        if(newTime > option.duration) {
            css(option.obj,option.attr,option.target);
            option.fn && option.fn();
        }else{
            requestAnimationFrame(move);
        }
    };
    requestAnimationFrame(move);
}

function getNum(min,max,num){//获取随机数  最小值，最大值，数量
    var n = num || max-(min-1);
    var newNum = Math.round(Math.random()*max);
    var arr = [];
    var json = {};
    while(arr.length < n ){
        newNum = Math.round(Math.random()*max);
        if(newNum >= min  && !json[newNum]){
            arr.push(newNum);
            json[newNum] = 1;
        }
    }
    return arr;
}


/*

    t : time 已经运动的时间
    b : begin 起始点
    c : count 运动总量
    d : duration 运动的总时间
*/


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
    elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
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
            s = 1.70158;  //回弹指数
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
    bounceOut: function(t, b, c, d){//*
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