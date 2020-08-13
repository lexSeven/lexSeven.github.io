function startMove(node, cssObj, complete) {//complete = show;
    clearInterval(node.timer);
    node.timer = setInterval(function(){
        var isEnd = true; //假设所有的动画都到达目的值。
        for(var attr in cssObj){
            var iTarget = cssObj[attr];
            //计算速度
            var iCur = null;
            if(attr == "opacity"){
                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
            }else{
                iCur = parseInt(getStyle(node, attr))
            }
            
            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            
            if(attr == "opacity"){
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = "alpha(opacity=" + iCur +  ")";
            }else{
                node.style[attr] = iCur + speed + 'px';
            }  

            if(iCur != iTarget){
                isEnd = false;
            }
        }

        if(isEnd){
            clearInterval(node.timer);
            if(complete){
                complete.call(node);
            }
        }
    }, 30);
}

//获取当前有效样式浏览器兼容的写法
function getStyle(node, cssStr){
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
}