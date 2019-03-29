
var awards = {//抽奖弹窗
    init:function(url){
        var _this = this;
        _this.obj = document.querySelector('.awardsBox');//抽奖弹窗
        _this.awardsBtn = document.querySelector('.diskBtn');//抽奖按钮
        _this.indecator = document.querySelector('.indecator');//指针

        _this.awaradPar = document.querySelector('.awaradPar');//成功窗口的父级
        _this.awardsCard = document.querySelector('.awardsCard');//成功窗口
        _this.priceCheckBtn = document.querySelector('.awardsSuccess .checkBtn');//成功正面按钮
        _this.priceBcakBtn = document.querySelector('.awardsDetail .checkBtn');//成功反面按钮

        _this.prizeName = _this.awaradPar.querySelector('.prize2');//成功正面奖品名称
        _this.prizeNameBack = _this.awaradPar.querySelector('.prizeName span');//成功反面奖品名称
        _this.expireTime = _this.awaradPar.querySelector('.expire_time');//兑奖时间

        _this.closeRemind = _this.obj.querySelector('.closeBtn');//抽奖界面关闭按钮
        _this.closeBtn = _this.awaradPar.querySelectorAll('.close');//成功界面关闭按钮

        _this.userList = _this.obj .querySelector('.listMain');//中奖用户列表
        _this.leftNum = _this.obj.querySelector('.leftNum .num');//抽奖次数
        _this.activityInfo = _this.obj.querySelector('.userList .des');//活动说明
        _this.prizeDesMain = _this.awaradPar.querySelector('.prizeDesMain');//奖品描述
        _this.lightPop = _this.obj.querySelectorAll('.lightWhite span');//灯

        _this.off = true;
        _this.num = 0;

        //var url = url || '/account/award/check';//接口

        //_this.check(url);
        // _this.getawards();

        /*
        * data.users  获奖名单，显示弹窗时会动态填入抽奖弹窗右边的获奖名单里
        *   user   用户名
        *   award  所获奖品
        * data.info  活动说明，显示弹窗时会动态填入抽奖弹窗
        * data.items 所有奖品列表（一共八个）
        *   ai_id  奖品ID
        *   ai_name奖品名称
        *   ai_desc奖品说明
        * */

        var data = {//这里是数据
            users: [
                {
                    user:'asda',
                    award:'asdhaosj'
                },
                {
                    user:'asda',
                    award:'asdhaosj'
                },
                {
                    user:'asda',
                    award:'asdhaosj'
                },
                {
                    user:'asda',
                    award:'asdhaosj'
                },
                {
                    user:'asda',
                    award:'asdhaosj'
                }
            ],
            info:'这里是活动说明',
            items:[
                {
                    ai_id:1,
                    ai_name:'第一个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:2,
                    ai_name:'第二个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:3,
                    ai_name:'第三个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:4,
                    ai_name:'第四个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:5,
                    ai_name:'第五个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:6,
                    ai_name:'第六个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:7,
                    ai_name:'第七个奖品',
                    ai_desc:'奖品说明'
                },
                {
                    ai_id:8,
                    ai_name:'第八个奖品',
                    ai_desc:'奖品说明'
                }
            ]
        }

        /*
        *   实现逻辑：
        *   _this.num  用户可抽奖次数，有业务逻辑时，这个次数由后端给出，当用户抽奖一次之后，_this.num会减少1 当_this.num为0时，抽奖弹窗会关闭
        *   _this.showAwardsBox(data);显示抽奖弹窗方法，需要拿到data里面相应的数据进行动态填入抽奖弹窗
        *   _this.getawards(data.items);抽奖方法
        * */

        _this.num = 1;
        _this.showAwardsBox(data);
        _this.getawards(data.items);

    },
    check:function(url){
        var _this = this;
        $.ajax({
            type: 'get',
            url: url,
            success: function (data){
                if(data.type < 0){
                    alert('警告：'+data.msg);
                }else if(data.type == 1){
                    _this.num = data.num;
                    _this.showAwardsBox(data);
                    _this.getawards(data.items);
                }
            }
        });
    },
    showAwardsBox:function(data){//用于显示抽奖弹窗
        var _this = this;

        _this.leftNum.innerText = _this.num;//填入用户剩余抽奖次数

        /*填入中奖用户*/
        var str = '';
        data.users.forEach(function(item,key){
            if(key<9){
                str += '<dd class="list">\
                        <span class="item">恭喜: <em class="num">'+ item.user +'</em></span>\
                        <span class="item">获得'+ item.award +'</span>\
                    </dd>';
            }
        });
        _this.userList.innerHTML = '<dt class="listheader">\
                                    <span class="item">用户</span>\
                                    <span class="item">奖励方式</span>\
                                </dt>' + str;
        /*填入中奖用户*/

        /*填入活动说明*/
        _this.activityInfo.innerHTML = data.info;

        /*显示中奖弹窗*/
        _this.obj.parentNode.style.display = 'block';
        _this.obj.parentNode.style.transition = '0.5s';
        _this.obj.style.display = 'block';
        setTimeout(function(){
            _this.obj.parentNode.style.opacity = '1';
            _this.obj.classList.add('active');
        },50);


        /*用户主动关闭则去掉弹窗提示*/
        _this.closeRemind.onclick = function(){
            var r=confirm("确定要关闭抽奖弹窗么？关闭之后将不会再主动提示抽奖；您可以到个人中心——我的抽奖页面进行抽奖...");
            if (r==true){
                // close();
                _this.obj.parentNode.style.display = 'none';
                window.location.reload();
            }
        }

        function close(){
            $.ajax({
                type: 'get',
                url: '/account/award/closepop',
                success: function (data){
                    if(data.type == 1){
                        _this.obj.classList.remove('active');
                        _this.obj.classList.add('out');
                        _this.obj.parentNode.style.opacity = '0';
                        setTimeout(function(){
                            _this.obj.parentNode.style.display = 'none';
                            window.location.reload();
                        },400);
                    }else{
                        console.log('提醒：'+data.msg);
                    }
                }
            });
        }
    },
    getawards:function(awardsArr){
        /*
        *
        * 抽奖方法
        * _this.awardsBtn 是抽奖按钮，当它点击的时候，会得到一个中奖的奖品ID。当有业务逻辑时，这个奖品应从后端获取，现在是随机获取（getNum方法）
        *
        * */

        var _this = this;
        _this.awardsBtn.onclick = function(){

            var aiid = getNum(1,8)[0];//获取此次抽奖的中奖奖品ID
            var time = '2019-03-28'//奖品需要一个兑奖时间，会动态填入中奖弹窗里面

            awardsArr.forEach(function(item,key){
                if(item.ai_id == aiid){
                    arr = key;
                    _this.prizeName.innerText = item.ai_name;
                    _this.prizeNameBack.innerText = item.ai_name;
                    _this.expireTime.innerText = '兑换有效期：'+time;
                    _this.prizeDesMain.innerHTML = item.ai_desc;
                }
            });

            var around = getNum(8,14)[0]*360;
            var lastnum = around + (arr*45-22);

            /*
            *
            * 这里是转盘的核心，上面around变量是随机获取的一个数字，这个数字决定指针会转多少圈
            * 上面lastNum变量则是决定指针最后停留的位置，这个位置是由arr变量来决定的，而arr则是由抽奖结果决定
            *
            * 因为转盘总共分为了8个部分，当所获奖品ID为6时，指针应该从0°开始旋转(360/8)*6°  360/8=45  所以上面 lastNum后面的度数就是 arr*45
            * 最后之所以要再减去22  是因为每个奖品跨越了45°如果指针要停留在奖品的中间位置，则需要再减去45/2°约等于22
            * 当指针旋转的角度计算出来了之后则直接利用doMove运动函数去运动指针就可以了
            * */

            doMoveRequest({
                obj:_this.indecator,
                attr:'transform',
                target:lastnum,
                duration:14000,
                fx:'easeOutStrong',
                moving:function(value){
                    _this.lightPop[Math.floor((value%360)/45)].classList.add('active');
                    var num = 0;
                    switch(Math.floor((value%360)/45)){
                        case 0:
                            num = 6;
                            break;
                        case 1:
                            num = 7;
                            break;
                        default:
                            num = Math.floor((value%360)/45)-2;
                    }
                    _this.lightPop[num].classList.remove('active');
                },
                fn:function(){
                    _this.obj.classList.remove('active');
                    _this.obj.classList.add('out');
                    _this.awaradPar.style.display = 'block';
                    _this.awardsCard.classList.add('active');
                    setTimeout(function(){
                        _this.indecator.style = '';
                    },500);
                    _this.off = true;
                }
            });
        };

        _this.priceCheckBtn.onclick = function(){
            _this.awardsCard.classList.remove('active');
            _this.awardsCard.classList.remove('focusout');
            _this.awardsCard.classList.add('focus');
        };
        _this.priceBcakBtn.onclick = function(){
            _this.awardsCard.classList.remove('focus');
            _this.awardsCard.classList.add('focusout');
        };

        _this.closeBtn[0].onclick = _this.closeBtn[1].onclick = function(){
            if(_this.num>0){
                _this.awaradPar.style.display = 'none';
                _this.obj.classList.remove('out');
                _this.obj.classList.add('active');
                _this.leftNum.innerText = _this.num;
                _this.awardsCard.classList.remove('active');
                _this.awardsCard.classList.remove('focusout');
                _this.awardsCard.classList.remove('focus');
                _this.getawards(awardsArr);
            }else{
                _this.obj.parentNode.style.display = 'none';
                _this.awaradPar.style.display = 'none';
                window.location.reload();
            }
        };

        function getNum(min,max,num){//获取随机数
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
    }
}
//awards.init();

var getDetail = {
    init:function(){
        var _this = this;
        _this.obj = document.querySelectorAll('[data-getdetail]');
        _this.mark = document.querySelector('.checkawardsDetail');
        _this.awardsCard = _this.mark.querySelector('.awardsCard');
        _this.prizeName = _this.mark.querySelector('.prizeName');//奖品名称
        _this.prizeDesMain = _this.mark.querySelector('.prizeDesMain');//奖品描述
        _this.expireTime = _this.mark.querySelector('.expire_time');//奖品兑换有效期
        _this.close = _this.mark.querySelector('.close');//关闭按钮
        _this.bind();
    },
    bind:function(){
        var _this = this;
        for(var i=0;i<_this.obj.length;i++){
            _this.obj[i].onclick = function(){
                $.ajax({
                    type: 'get',
                    url: this.dataset.ajaxurl,
                    success: function (data){
                        if(data.type==1){
                            _this.prizeName.innerText = data.data.name;
                            _this.expireTime.innerText = '兑换有效期：'+data.data.time;
                            _this.prizeDesMain.innerHTML = data.data.desc;
                            _this.showDetail();
                        }else{
                            alert('出错啦！');
                            window.location.reload();
                        }
                    }
                });
            }
        }
        _this.close.onclick = function(){
            _this.mark.style.display = 'none';
        }
    },
    showDetail:function(){
        var _this = this;
        _this.mark.style.display = 'block';
        _this.mark.style.transition = '1s';
        _this.awardsCard.classList.add('active');
        setTimeout(function(){
            _this.mark.style.opacity = '1';
        },50);
    }
};


function awardscss(obj,attr,val){
    if(arguments.length == 3){
        obj.style[attr] ='rotate(' + val + 'deg)';
    }else {
        return getComputedStyle(obj)[attr];
    }
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

    var start = 0;
    var distance = option.target - start;//运动的距离
    var time = Date.now();

    var fx = option.fx || 'linear';
    function move(){
        var newTime = Date.now() - time;
        var value = awardsTween[fx](newTime,start,distance,option.duration);
        option.moving(value);
        awardscss(option.obj,option.attr,value);
        if(newTime > option.duration) {
            awardscss(option.obj,option.attr,option.target);
            option.fn && option.fn();
        }else{
            requestAnimationFrame(move);
        }
    };
    requestAnimationFrame(move);
}
/*

    t : time 已经运动的时间
    b : begin 起始点
    c : count 运动总量
    d : duration 运动的总时间
*/


var awardsTween = {
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
        return c - awardsTween['bounceOut'](d-t, 0, c, d) + b;
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
            return awardsTween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return awardsTween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}