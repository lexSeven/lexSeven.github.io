//获取、设置样式方法
// css(元素,样式名称,样式值)
function css(obj,attr,val){
    if(arguments.length == 2){
        return parseFloat(getComputedStyle(obj)[attr]);
    }else{
        obj.style[attr] = val + 'px';
    }
}


// 检测2个元素是否碰撞 - 如果发生碰撞 返回true 如果没有碰撞 返回false
// contactFn(元素1,元素2)
function contactFn(o1,o2){
    var o1Pos = o1.getBoundingClientRect();
    var o2Pos = o2.getBoundingClientRect();

    if(
        o1Pos.right < o2Pos.left ||
        o1Pos.left > o2Pos.right ||
        o1Pos.bottom < (o2Pos.top + 10) ||
        o1Pos.top > o2Pos.bottom
        ){
        return false
    }
    return true
}

// 获取对应的html元素
var content = document.querySelector('.content');
var mario = document.querySelector('.mario');
var man = mario.querySelector('img');
var scoreBox = document.querySelector('.scorecard strong');
var gameover = document.querySelector('.gameover');
var total = document.querySelector('.gameover span');
var btn = document.querySelector('#btn');
var isGameover = false;
var monitorTimer = null;
var marioRunTimer = null;
var pipeTimer = null;
var scoreTimer = null;
var cloudTimer = null;
var picIndex = 0;
var score = 0;
var style = document.querySelector('#sty');

// 给开始游戏按钮添加点击事件
btn.addEventListener('click',startPlay)

// 开始游戏
function startPlay(){

    //再次开始游戏时 - 将状态重置
    resetState()

    //马里奥开始跑动
    marioRun()

    // 创建障碍物
    newPipe()

    // 计分规则 - 每隔0.5秒 记一分
    clearInterval(scoreTimer);
    scoreTimer = setInterval(()=>{
        // 加一分
        score +=1;
        // 更新计分板信息
        scoreBox.innerHTML = score;
    },500)

    // 初始化-创建3片云
    newCloud(1)
    newCloud(2)
    newCloud(3)

    // 创建云 - 每隔5秒 生成一片云彩
    clearInterval(cloudTimer);
    cloudTimer = setInterval(()=>{
        // 创建云
        newCloud();
    },5000)
    
    //实时监测 马里奥是否与障碍物发生碰撞 - 时间间隔 30毫秒一次
    clearInterval(monitorTimer);
    monitorTimer=setInterval(function(){
        // 获取到所有的障碍物
        var pipes = document.querySelectorAll('.pipe');

        pipes.forEach((item)=>{
            // 当条件为真时 - 执行if当中的语句
            if(contactFn(mario,item)){
            
                // 同时宣告游戏结束 - 执行游戏结束的方法
                gameoverFn(score)
                
                // 将游戏结束的状态改为真
                isGameover = true;
            }
        })

        // 当游戏结束状态为真时 停止监测马里奥碰撞
        isGameover&&clearInterval(monitorTimer);
    },30)
}

// 马里奥跑动方法;
function marioRun(){
    // 马里奥每隔150毫秒执行一次图片切换（动作切换）
    clearInterval(marioRunTimer)
    marioRunTimer=setInterval(()=>{
        // 图片下标+1
        picIndex++;
        man.src = 'img/man1'+(picIndex%3)+'.png';
    },150)
}

// 重新开始游戏时 - 将状态都重置归0 
function resetState(){
    // 分数归0
    score = 0;
    // 计分板显示归0
    scoreBox.innerHTML = score;
    // 游戏结束面板隐藏
    gameover.style.display = 'none';
    // 获取所有的障碍物
    var pipes = document.querySelectorAll('.pipe');
    // 删除所有的障碍物
    pipes.forEach((item)=>item.remove())
    // 获取所有的云彩
    var clouds = document.querySelectorAll('.cloud');
    // 删除所有的云彩
    clouds.forEach((item)=>item.remove())
    // 删除马里奥停止运动样式
    mario.classList.remove('paused');
    // 背景开始向后运动（地面）
    content.classList.add('runBg');
    // 隐藏开始游戏按钮
    btn.classList.add('btnHide');
    // 删除云朵随机生成的样式
    style.innerHTML = '';
}

// 游戏结束时执行的方法
function gameoverFn(score){
    // 显示游戏结束面板
    gameover.style.display = 'block';
    // 将最终分数显示在游戏结束面板中
    total.innerHTML = score;
    // 停止马里奥的跑动效果
    clearInterval(marioRunTimer);
    // 停止加分
    clearInterval(scoreTimer);
    // 停止创建云朵
    clearInterval(cloudTimer);
    // 停止背景向后运动（地面）
    content.classList.remove('runBg');
    // 显示开始游戏按钮
    btn.classList.remove('btnHide');

    // 获取所有障碍物
    var pipes = document.querySelectorAll('.pipe');
    // 让所有障碍物都暂停运动
    pipes.forEach((item)=>item.classList.add('paused'))

    // 获取所有云朵
    var clouds = document.querySelectorAll('.cloud');
    // 让所有云朵都暂停运动
    clouds.forEach((item)=>item.classList.add('paused'))
    // 让马里奥暂停运动
    mario.classList.add('paused')
}


// 创建云朵的方法
function newCloud(n){
    // 创建一个div标签
    var cloud = document.createElement('div');
    // 给这个div添加cloud样式
    cloud.classList.add('cloud');
    // 获得一个0-200的随机值作为云朵的高度
    var t = Math.random()*200;
    // 设置云朵距离浏览器顶部高度
    css(cloud,'top',t)
    // 把创建好的云朵标签添加到页面中
    content.appendChild(cloud);

    // 判断是否是初始化云朵 如果有值 就创建对应动画帧
    if(n){
        // 随机的left 
        // document.documentElement.clientWidth; 获取页面本身宽度
        var l = Math.random()*document.documentElement.clientWidth;
        cloud.style.animation = `cloudRun${n} linear 30s`;
        style.innerHTML +=`@keyframes cloudRun${n}{from{ left:${l}px; }to{ left:-300px}}`;
    }

    // 当云朵运动到屏幕外时 自动删除
    cloud.addEventListener('animationend',function(){
        cloud.remove();
    })
}

// 创建障碍物方法
function newPipe(){
    (function add(){
        if(isGameover){
            isGameover=false;
            return;
        } 
        // 随机生成 1200-2200 之间的值
        var rndTime = (Math.random()*1000+1200);

        // 生成障碍物
        pipeFn();

        // 随机时间调用创建障碍物方法
        clearTimeout(pipeTimer)
        pipeTimer = setTimeout(add,rndTime);
    })()
}

// 生成障碍物方法
function pipeFn(){
    // 创建一个div标签
    var pipe = document.createElement('div');
    // 设置一个随机高度（40-90px） 和 随机宽度（30-70px）
    // Math.random() 0-1 随机数
    var H = parseInt(Math.random()*50+40);
    var W = parseInt(Math.random()*40+30);
    // 设置对应的宽高
    css(pipe,'height',H);
    css(pipe,'width',W);
    // 给障碍物添加样式
    pipe.classList.add('pipe');
    // 把障碍物加入到页面中
    content.appendChild(pipe);

    // 当障碍物运动到屏幕外面时，自动删除
    pipe.addEventListener('animationend',function(){
        pipe.remove();
    })
}

// 添加键盘事件 - 键盘按下时
document.addEventListener('keydown',function(e){
    // 当用户按下空格键时 执行if当中的语句
    // 32 空格
    if(e.keyCode == 32){
        // 给马里奥添加一个跳跃的样式
        mario.classList.add('jump');
        // 同事暂停马里奥的运动状态
        clearInterval(marioRunTimer);
    }

    // 当马里奥跳跃动作完成时执行以下语句
    mario.addEventListener('animationend',function(){
        // 删除马里奥的跳跃样式
        mario.classList.remove('jump');
        // 让马里奥继续开始运动状态
        marioRun()
    },{
        once:true
    })
})



