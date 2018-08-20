var bottomLine = {
    init:function(){
        var _this = bottomLine;
        _this.parent = $s('.bottomLine');
        _this.time = _this.parent.querySelector('.rightIcon > .time');
        _this.addTime();
        showDate();
    },
    addIcons:function(option){
        var _this = bottomLine;
        switch(option.obj){
            case 'qqMusic':
                createIcons('qqMusic');
                break;
        }
        function createIcons(className){
            var i = document.createElement('i');
            i.className = 'icon ' + className;
            i.id = 'className';
            i.onclick = function(){
                option.callback();
            }
            _this.parent.querySelector('.leftIcon').appendChild(i);
        }
    },
    addTime:function(){
        var _this = bottomLine;
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var date = d.getDate();
        var hours = d.getHours();
        var min = d.getMinutes();

        _this.time.setAttribute('title',year+'年'+month+'月'+date+'日');
        _this.time.innerHTML = hours + ':' + min;

        _this.time.onclick = function(){
            document.querySelector('.bottomLine .dateList').classList.toggle('active');
        };


        setInterval(getTime,60000);
        function getTime(){
            var d = new Date();
            var hours = d.getHours();
            var min = d.getMinutes();
            _this.time.innerHTML = hours + ':' + min;
        }
    }
};

function showDate(){
    var parent = document.querySelector('.bottomLine .dateList');
    var main = parent.querySelector('.main');
    var dateBox = parent.querySelector('.date');
    var monthBox = parent.querySelector('.listTitle');
    var timeBox = parent.querySelector('.time');
    var listBox = parent.querySelector('.listBox');
    var mask = parent.querySelector('.markBox');

    var prevBtn = parent.querySelector('.prevBtn');
    var nextBtn = parent.querySelector('.nextBtn');

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var date = d.getDate();

    int();
    function int(){
        dateBox.innerHTML = year + '年' + month + '月' + date + '日';
        timeBox.innerHTML = d.getHours() + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
        setInterval(function(){
            var d = new Date();
            timeBox.innerHTML = d.getHours() + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
        },1000);
    }

    prevBtn.onclick = function(){//点击上个月
        month--;
        if(month<1){
            month = 12;
            year --;
        }
        renderDate(year,month,date);
    };
    nextBtn.onclick = function(){//点击下个月
        month++;
        if(month>12){
            month = 1;
            year ++;
        }
        renderDate(year,month,date);
    };

    renderDate(year,month,date);//渲染月份
    function renderDate(year,month,date){

        monthBox.innerHTML = year + '年' + month + '月';

        var str = '';
        for(var i=0;i<getMonthNum(year,month);i++){
            str += '<span>'+ (i+1) +'</span>';
        }
        main.innerHTML = str;
        str = '';
        var first = main.querySelector('span');
        first.style.gridColumnStart = getDay(year,month);

        var now = main.querySelectorAll('span')[date-1];
        if(getMonthNum(year,month)>date){
            now.className = 'now';
        }

        /* 这里把上个月的最后几天补满 */
        var n = 0;
        var week = getDay(year,month);
        if(week==0){
            n = 6;
        }else{
            n = week-1;
        }
        var prevLastDate = getMonthNum(year,month-1);

        for(var i=n-1;i>=0;i--){
            str += '<span class="prev" style="grid-row-start: 1;">'+ (prevLastDate-i) +'</span>';
        }
        main.innerHTML += str;
        str = '';

        /* 这里把下个月的前几天补满(42是格子总数) */
        var nextNum = 42 - getMonthNum(year,month,0) - (getDay(year,month) - 1);
        for(var i=1;i<=nextNum;i++){
            str += '<span class="next">'+ i +'</span>';
        }
        main.innerHTML += str;
        str = '';

        knock();
    }

    function knock(){
        var span = main.querySelectorAll('span');
        var nowDate = main.querySelector('span.now');
        var prev = null;
        for(var i=0;i<span.length;i++){
            span[i].onclick = function(){
                if(prev){
                    prev.className = '';
                }
                nowDate.className = 'nowAct';
                this.className = 'active';
                prev = this;
            }
        }
    }


    function addZero(n){
        return n < 10 ? '0' + n : n;
    }

    function getMonthNum(year,month){//获取某年某月有多少天
        var d = new Date();
        d.setFullYear(year);
        d.setMonth(month,0);
        return d.getDate();
    }
    function getDay(year,month,date){//获取某年某月某日是星期几（日期可不传，默认是1号）
        var d = new Date();
        var arr = [7,1,2,3,4,5,6];
        var date = date || 1;
        d.setFullYear(year);
        d.setMonth(month-1,date);
        return arr[d.getDay()];
    }

    listBox.onmousemove = function(ev){
        var left = ev.clientX - this.getBoundingClientRect().x - 75;
        var top = ev.clientY - this.getBoundingClientRect().y - 75 - 85;
        mask.style.backgroundPosition = left + 'px '+ top +'px';
    }
    listBox.onmouseout = function(ev){
        mask.style.backgroundPosition ='-150px -150px';
    }
}
