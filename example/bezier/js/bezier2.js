var bezier = {
    init:function(option){
        var _this = this;

        /*{
            point:[],曲线要穿过的点，数组
            k:0~2, //控制曲线弯曲程度 0~1 越小转角弯曲程度越大
            interval:1~20+ //控制曲线平滑程度，越大越不平滑
            element:canvas //绘制的canvas对象
            canvas:canvasElement.getContext('2d'),canvas绘画环境
            strokeStyle:color,可选，曲线颜色
            isFull:false,  //是否填充，默认不填充
            fillStyle:color,可选，填充颜色
            drawFunction:true，//是否执行动画,默认不执行
            speed:2 //动画执行速度，数字越大动画越快 速度同样也会影响曲线的平滑程度
            callBack:function(){}//回调函数
        }*/

        /*
            原理分析：
                穿过任意几个点画曲线，首先假设这任意的几个点是可以组合成一个几何图形的，暂且先不管这个图形是什么样子的。
                第一步，先把所有的点连接起来形成一条线。
                第二步，找到左右线段的中点，这些中点其实就是虚拟的控制点  把两个虚拟的控制点连接起来形成一条新的线
                第三步，把控制点连接起来的线平移，平移到线的中点和顶点（我们要穿过的点）重合，那么这时候这条线的两个顶点就是真实的曲线控制点了
                第四部，根据控制点坐标以及顶点坐标在每两个点之间画一条贝塞尔曲线
        */

        _this.point = option.point;
        _this.k = option.k || 0.6;
        _this.interval = option.interval || 1;
        _this.C1 = option.canvas;
        _this.C1.strokeStyle= option.strokeStyle || "#dd657c";
        _this.C1.fillStyle = option.fillStyle || '#899';
        _this.isFull = option.isFull || false;
        _this.callBack = option.callBack || false;
        _this.drawFunction = option.drawFunction || false;
        _this.speed = option.speed || 2;
        _this.element = option.element;

        _this.dummyControlDot = null;//虚拟的控制点
        _this.lastControl = null;//最终的控制点
        _this.finishDot = null;//把起点（要穿过的点）和控制点放在一起，方便使用贝塞尔曲线公式计算曲线
        _this.n = 0;
        _this.timer2 = null;
        _this.t = [];//1~100之间的数字，用于贝塞尔曲线计算
        for(var i=1;i<101;i++){
            _this.t.push(i);
        }
        _this.lastPosition = [];//计算完成之后曲线上每一个点的坐标
        _this.findControl();
        if(_this.drawFunction){
            _this.getlastPosition();
        }else{
            _this.drawLine();
        }
    },
    findDummyControl:function(vertex){//把每一个顶点之间连线，然后找到这条线的中点，那么这些中点就是虚拟控制点
        var _this = this;
        var Control = [];
        for(var i=0;i<vertex.length;i++){
            var nextDot = i+1==vertex.length?0:i+1;
            var x = (vertex[i][0] - vertex[nextDot][0])/2 + vertex[nextDot][0];
            var y = (vertex[i][1] - vertex[nextDot][1])/2 + vertex[nextDot][1];
            Control.push([x,y]);
        }
        return Control;
    },
    findControl:function(){
        var _this = this;
        _this.dummyControlDot = _this.findDummyControl(_this.point);
        var controlMiddle = _this.findDummyControl(_this.dummyControlDot);//把控制点连接起来，形成控制线 一步找到控制线的中点
        _this.lastControl = [];
        _this.finishDot = [[vertex[0][0],vertex[0][1]]];//把起始点放进去

        for(var i=0;i<_this.point.length;i++){//把控制线平移到控制线的中点和顶点重合，那么这时候的控制点才是最终的控制点
            var prevDot = i-1<0?_this.point.length-1:i-1;

            var xDifference = controlMiddle[prevDot][0] - _this.point[i][0];
            var yDifference = controlMiddle[prevDot][1] - _this.point[i][1];
            //这里用于算出控制线和顶点之间的距离

            var lastControlaX = _this.dummyControlDot[prevDot][0] - xDifference;
            var lastControlaY = _this.dummyControlDot[prevDot][1] - yDifference;
            //把控制线平移之后得到第一个控制点

            var controlax = lastControlaX - (lastControlaX - _this.point[i][0])*(1-_this.k);
            var controlay = lastControlaY - (lastControlaY - _this.point[i][1])*(1-_this.k);
            //根据K值来计算最终控制点，K值可以控制曲线的平滑程度

            var lastControlbX = _this.dummyControlDot[i][0] - xDifference;
            var lastControlbY = _this.dummyControlDot[i][1] - yDifference;
            //把控制线平移之后得到第二个控制点

            var controlbx = lastControlbX - (lastControlbX - _this.point[i][0])*(1-_this.k);
            var controlby = lastControlbY - (lastControlbY - _this.point[i][1])*(1-_this.k);
            //根据K值来计算最终控制点，K值可以控制曲线的平滑程度

            _this.lastControl.push([controlax,controlay,controlbx,controlby]);
        }

        for(var i=0;i<_this.lastControl.length;i++){//根据推导出来的贝塞尔曲线控制，要求的格式是 起始点，控制点，控制点，终点
            var nextDot = i+1==_this.lastControl.length?0:i+1;

            if(_this.drawFunction){
                _this.finishDot.push([
                    _this.point[i][0],_this.point[i][1],
                    _this.lastControl[i][2],_this.lastControl[i][3],
                    _this.lastControl[nextDot][0],_this.lastControl[nextDot][1],
                    _this.point[nextDot][0],_this.point[nextDot][1]
                ]);
            }else{
                _this.finishDot.push([
                    _this.lastControl[i][2],_this.lastControl[i][3],
                    _this.lastControl[nextDot][0],_this.lastControl[nextDot][1],
                    _this.point[nextDot][0],_this.point[nextDot][1]
                ]);
            }
        }
        return _this.finishDot;
    },
    getlastPosition:function(){//把最终得到的坐标点根据贝塞尔曲线计算每个点的坐标
        var _this = this;
        var res = null;
        var i = 1;
        var n = 1;
        start();
        function start(){
            res = _this.getposition({position:_this.finishDot[n],t:_this.t[i]/100});
            _this.lastPosition.push([res[0],res[1]]);
            i+= _this.interval;
            if(i>100){n++;i=1;}
            if(n >= _this.finishDot.length) {
                if(_this.drawFunction){
                    _this.move({num:100});
                }
            }else{
                start();
            }
        }
    },
    getposition:function(option){//贝塞尔曲线公式
        var _this = this;
        var position = option.position;
        var t = option.t;
        var Ix = position[0]*((1-t)*(1-t)) + position[2]*2*(1-t)*t + position[4]*(t*t);
        var Iy = position[1]*((1-t)*(1-t)) + position[3]*2*(1-t)*t + position[5]*(t*t);

        var Jx = position[2]*((1-t)*(1-t)) + position[4]*2*(1-t)*t + position[6]*(t*t);
        var Jy = position[3]*((1-t)*(1-t)) + position[5]*2*(1-t)*t + position[7]*(t*t);

        var Ex = Ix*(1-t) + Jx*t;
        var Ey = Iy*(1-t) + Jy*t;
        return [Ex,Ey];
    },
    drawLine:function(option){
        var _this = this;
        _this.C1.clearRect(0,0,_this.element.offsetWidth,_this.element.offsetHeight);
        _this.C1.beginPath();
        _this.C1.moveTo(_this.finishDot[0][0],_this.finishDot[0][1]);
        draw();
        function draw(){
            _this.n++;
            _this.C1.bezierCurveTo(
                _this.finishDot[_this.n][0],
                _this.finishDot[_this.n][1],
                _this.finishDot[_this.n][2],
                _this.finishDot[_this.n][3],
                _this.finishDot[_this.n][4],
                _this.finishDot[_this.n][5]);
            _this.C1.stroke();
            if(_this.n < _this.finishDot.length-1){
                draw();
            }else{
                if(_this.isFull){_this.C1.fill();}
            }
        }
    },
    move:function(option){
        var _this = this;

        _this.C1.clearRect(0,0,_this.element.offsetWidth,_this.element.offsetHeight);
        _this.C1.beginPath();
        _this.C1.moveTo(_this.lastPosition[0][0],_this.lastPosition[0][1]);

        _this.timer2 = setInterval(function(){
            _this.n = parseInt(_this.n);
            _this.C1.lineTo(_this.lastPosition[_this.n][0],_this.lastPosition[_this.n][1]);
            _this.C1.stroke();
            if(_this.isFull){_this.C1.fill();}
            _this.n+=_this.speed;
            if(_this.n>=_this.lastPosition.length * (option.num/100)){
                clearInterval(_this.timer2);
            }
            if (_this.n >= _this.lastPosition.length) {
                clearInterval(_this.timer2);
                _this.C1.lineTo(_this.lastPosition[0][0],_this.lastPosition[0][1]);
                _this.C1.stroke();
                _this.callBack && _this.callBack();
            }
        },_this.time/_this.lastPosition.length);
}
};