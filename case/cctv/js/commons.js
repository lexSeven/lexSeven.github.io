/**
 * Created by qnbmhgjytu on 15/4/20.
 */
/*----------------------------------------工具函数--------------------------------------------------------*/

function s(obj) {
    return document.getElementById(obj);
};

function sClass( obj ){
    return document.querySelector( obj )
};

function bind(obj, ev, fn) { //事件绑定
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

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

function ajax(method, url, data, success,schedule){//ajax异步处理函数
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var oUpload = xhr.upload;
    oUpload.onprogress  = function(ev) {
        var iScale = ev.loaded / ev.total;
        schedule(iScale);
    }

    if (method == 'get' && data) {
        url += data ;
    }

    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        //xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
        //xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send( data );
    }

    xhr.onreadystatechange = function() {

        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                console.log('出错了,Err：' + xhr.status);
            }
        }

    }
}

function ajax2(method, url, data, success){//ajax异步处理函数
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (method == 'get' && data) {
        url += data ;
    }

    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send( data );
    }

    xhr.onreadystatechange = function() {

        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                console.log('出错了,Err：' + xhr.status);
            }
        }

    }
}

function ajax3(method, url, data, success){//ajax异步处理函数
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (method == 'get' && data) {
        url += data ;
    }

    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send( data );
    }

    xhr.onreadystatechange = function() {

        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                console.log('出错了,Err：' + xhr.status);
            }
        }

    }
}

function lexIndex( obj ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            return i;
        }
    };
};

function lexPrevAll( obj,off ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            off?children.splice(i+1):children.splice(i)
        }
    };
    return children;
};

function lexNextAll( obj,off ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            off?children.splice(0, i):children.splice(0, i+1);
        }
    };
    return children;
};

function lexSibling( obj ){
    var children = lexChildren( obj.parentNode );
    for(var i=0;i<children.length;i++){
        if(obj == children[i]){
            children.splice(i, 1);
        }
    };
    return children;
};

function lexChildren( elem ){

    var elem_child = elem.childNodes;
    var child = [];

    for(var i=0; i<elem_child.length;i++){

        if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {

            elem.removeChild(elem_child[i])

        }else{
            child.push(elem_child[i]);
        }

    }

    return child;

};

function getByParent(obj, tagname, classname) { // 通过父级的className以及tagName获取元素
    var re = new RegExp('(^|\\s)' + classname + '(\\s|$)');
    while (obj.parentNode) {
        if(obj.parentNode.tagName != tagname){
            obj = obj.parentNode;
        }else{
            if (re.test(obj.parentNode.className)) {
                return obj.parentNode;
            }else{
                obj = obj.parentNode;
            }
        }

    }
};

function getByClass(parent, tagname, classname) { //通过Class名字获取元素
    var aEls = parent.getElementsByTagName(tagname);
    var arr = [];
    var re = new RegExp('(^|\\s)' + classname + '(\\s|$)');
    for (var i = 0; i < aEls.length; i++) {
        if (re.test(aEls[i].className)) {
            arr.push(aEls[i]);
        }
    }
    return arr;
}

function fileType(name){
    var newname=/\.[^\.]+$/.exec(name);
    //console.log(newname);
    console.log(newname[0]);
    console.log(newname[0].toLocaleLowerCase());
    return newname[0].toLocaleLowerCase();
}

function getNum( Max,num ){//获取一个随机数
    var arr = [];
    var json = {};
    while( arr.length < num ){
        var iNum =  Math.round( Math.random()*Max );
        if( !json[iNum] ){
            arr.push( iNum );
            json[iNum] = 1;
        }
    }
    arr.sort( function(a,b){ return a - b; } );
    return arr;
}

function toString( json ){
    var str = '';
    for( a in json ){
        str += '"'+a+'":"'+json[a]+'",'
    };
    return '{' + rtrim2( str ) + '}';
};


function rtrim2( obj ){//去掉尾0
    return obj.replace(/(,*$)/g,"");
}

function rtrim( obj ){//去掉尾0
    return obj.replace(/(0*$)/g,"");
}

/*----------------------------------------工具函数--------------------------------------------------------*/

var domainName = 'http://cctv-api.sensoro.com/';//公共域名
var videoUrl = '';//视频地址
var imgId = 'http://7xipof.com1.z0.glb.clouddn.com/video_img_novideo.jpg';//视频截图ID
var host = '';//HOST头
var lexImgUrl = '';//上传图片的地址
var isPhoto = false;//判断是否是上传图片
var lexLabel = false;//判断视频是否上传完毕
var _data = '';//获取到的总数据
var mypage = '';//页面函数对象
var scenicName = '';//景区名称
var videoId = '';//视频ID(请求视频截图时用)
var requestNum = 0;

var php_upToken = '';//phpToken;
var php_host = '';//phphost
var php_ImgToken = '';//上传图片用的Token；
var php_ticketId = '';//用户识别

function page(){

    var media= [
            {
                "type": "media",
                "id": 11,
                "name": "点赞"
            },
            {
                "type": "media",
                "id": 12,
                "name": "吐槽"
            },
            {
                "type": "media",
                "id": 13,
                "name": "投诉"
            },
            {
                "type": "media",
                "id": 14,
                "name": "表扬"
            },
            {
                "type": "media",
                "id": 15,
                "name": "弱爆了"
            },
            {
                "type": "media",
                "id": 16,
                "name": "给力"
            },
            {
                "type": "media",
                "id": 17,
                "name": "分享"
            },
            {
                "type": "media",
                "id": 18,
                "name": "感动"
            },
            {
                "type": "media",
                "id": 19,
                "name": "气愤"
            },
            {
                "type": "media",
                "id": 20,
                "name": "开心"
            },
            {
                "type": "media",
                "id": 21,
                "name": "抓拍"
            },
            {
                "type": "media",
                "id": 22,
                "name": "惊喜"
            }
        ]

    var _this = this;

    this.indexData = {
        impression:'',//综合分数
        service:'',//服务指数
        consumption:'',//消费指数
    };

    var judgeImpression = false;
    var judgeService = false;
    var judgeConsumption = false;
    var judgeIndexLabel = false;



    this.video = {
        url:'', 	     	//视频地址
        comment:'',         //说吧内容 （选填）
        phone:'', 			//用户手机 （选填）
        tags:'', 	       	//标签ID
        imgurl:'',
    };

    this.photo = {
        url:'', 	     	//图片地址
        comment:'',         //说吧内容 （选填）
        phone:'', 			//用户手机 （选填）
        tags:'',            //标签ID
    };

    this.indexLabel = {//景区标签ID
        tags:'',
    };

    console.log(this.video);

    this.judge = function(){
        if(!judgeImpression || !judgeService || !judgeConsumption){ _this.popup('请给景区评分'); return false; };
        if(!judgeIndexLabel){ _this.popup('请给景区添加标签！'); return false;};
        return true;
    };


    this.clickArea = {
        /*提交评分信息*/subScore:function(obj){
            //console.log(_this.indexData);
            //console.log(toString( _this.indexData ));
            if(_this.judge()){
                /*ajax3('post',domainName + 'comments',toString( _this.indexData ),function( data ){//提交评分信息
                    console.log( _this.indexLabel );
                    console.log(toString( _this.indexLabel ));
                    ajax3('post',domainName + 'emotions',toString( _this.indexLabel ));//提交景区标签
                    console.log(data);*/

                    sClass('.scrollBg').style.display = 'block';

                    setTimeout(function(){
                        s('scenicTitle').innerHTML = '今日主题<br>　「拍拍你身边的劳动者」';//获取今日主题
                        startMove( sClass('.scrollBg') , { opacity : 100 } , 100 , 'easeOut',function(){
                            addClass(obj.parentNode,'hide');
                        });
                        setTimeout(function(){
                            startMove( sClass('.scrollBg') , { opacity : 0 } , 200 , 'easeOut',function(){
                                sClass('.scrollBg').style.display = 'none';
                            });
                            _this.showpage(sClass('#mainscenicTalk'));
                        },1000);
                    },500);

                /*});*/
            };
        },
        /*综合分数*/comprehensive:function( obj ){
            score(obj);
            console.log( lexPrevAll( obj ) );
            console.log( lexNextAll( obj ) );
            _this.indexData.impression = lexIndex( obj );
            judgeImpression = true;
        },
        /*服务指数*/service:function( obj ){
            score(obj);
            _this.indexData.service = lexIndex( obj );
            judgeService = true;
        },
        /*消费指数*/consumption:function( obj ){
            score(obj);
            _this.indexData.consumption = lexIndex( obj );
            judgeConsumption = true;
        },
        /*标签*/reusableActive:function( obj ){
            var sibling = lexSibling( obj);
            for(var i=0;i<sibling.length;i++){
                removeClass(sibling[i],'active');
            };
            addClass(obj,'active');
            _this.indexLabel.tags = obj.innerHTML;
            judgeIndexLabel = true;
        },
        /*跳转到新闻线索*/newsClues:function( obj ){
            _this.showpage(s('mainnew'));
        },
        /*进入页面*/goIn:function(){
            startMove( sClass('.markWelcome') , { opacity : 0 } , 500 , 'easeOut',function(){
                sClass('.markWelcome').style.display = 'none';
            });
        },
        /*标签*/videoLabel:function( obj ){
            if(lexLabel){
                var sibling = lexSibling( obj);
                for(var i=0;i<sibling.length;i++){
                    removeClass(sibling[i],'active');
                };
                addClass(obj,'active');
                _this.video.tags = obj.innerHTML;
                _this.photo.tags = obj.innerHTML;
                removeClass(s('subComment'),'unUse');
                isPhoto?s('subComment').dataset.function = 'subPhoto':s('subComment').dataset.function = 'subComment';
            }else{
                _this.popup('请等待文件上传完成！');
            };
        },
        /*提交视频标签*/subComment:function( obj ){
           // var re = new RegExp('^[1-9][0-9]{10}');
            //if(re.test(s('phone').value) || s('phone').value == ''){
                _this.video.comment = s('comment').value;
                _this.video.phone = s('phone').value;
                _this.video.url = videoUrl;
                _this.video.imgurl = imgId;
                console.log(toString( _this.video ));
                _this.showpage(sClass('#mainSuccess'));
                //ajax3('post',domainName + 'videos',toString( _this.video ),function( data ){

                //);
           // }else {
               // _this.popup('请填写正确的手机号码！');
            //}
        },
        /*提交图片标签*/subPhoto:function( obj ){
           // var re = new RegExp('^[1-9][0-9]{10}');
            //if(re.test(s('phone').value) || s('phone').value == '') {
                _this.photo.comment = s('comment').value;
                _this.photo.phone = s('phone').value;
                _this.photo.url = lexImgUrl;
                console.log(toString(_this.photo));
                _this.showpage(sClass('#mainSuccess'));
                //ajax3('post', domainName + 'photos', toString(_this.photo), function (data) {

                //});
            //}else {
                //_this.popup('请填写正确的手机号码！');
            //}
        },
        /*重新评价*/reload:function( obj ){
            _this.showpage(s('mainindex'));
            removeClass(s('mainindex'),'hide');
        },
        /*返回首页*/backIndex:function( obj ){
            _this.showpage(s('mainindex'));
        },
        /*上传图片*/uploadVideo:function( obj ) {

            var date = new Date().getTime();
            var oFormData = new FormData();	//通过FormData来构建提交数据
            oFormData.append('file', obj.files[0]);
            oFormData.append('token', php_upToken);
            oFormData.append('key', "video_" + date + rtrim(getNum( 10,6).join('')) + fileType( obj.files[0].name ));
            //xhr.send(oFormData);

            //console.log(this.files[0].name);

            if(fileType( obj.files[0].name ) == '.mp4' || fileType( obj.files[0].name ) == '.mov' || fileType( obj.files[0].name ) == '.avi' || fileType( obj.files[0].name ) == '.mpeg'){

                mypage.showpage(document.querySelector('#mainupload'));

                s('addVideoLabel').innerHTML = '';
                s('addVideoLabel').innerHTML = '<h3 id="fileType">给视频加标签</h3>';
                for(var i=0;i<media.length;i++){//生成视频标签
                    s('addVideoLabel').innerHTML += '<span data-function="videoLabel" id="'+ media[i].id +'">'+ media[i].name +'</span>';
                };
                var schedule = document.getElementById('schedule');
                schedule.parentNode.style.opacity = 1;
                schedule.innerHTML = '视频上传中';

                lexLabel = true;//判断可以添加标签
                schedule.innerHTML = '视频上传成功！';

                /*ajax('post', 'http://upload.qiniu.com/', oFormData, function( data ){//上传视频成功
                    var data = JSON.parse(data);
                    if(data.persistentId){
                        videoId = data.persistentId
                        _this.getVideoImg(videoId);
                    }
                    lexLabel = true;//判断可以添加标签
                    schedule.innerHTML = '视频上传成功！';
                    videoUrl = php_host + data.key;
                    setTimeout(function(){
                        startMove( schedule.parentNode , { opacity : 0 } , 500 , 'easeOut');
                    },1000);
                },function( num ){
                    schedule.style.width = view().w * num + 'px';
                });*/
            }else{
                mypage.popup('请选择视频文件！');
            }

        },
        /*上传图片*/uploadImage:function( obj ){

            var date = new Date().getTime();
            var oFormData = new FormData();	//通过FormData来构建提交数据
            oFormData.append('file', obj.files[0]);
            oFormData.append('token', php_ImgToken);
            oFormData.append('key', "image_" + date + rtrim(getNum( 10,6).join('')) + fileType( obj.files[0].name ));
            //xhr.send(oFormData);

            //console.log(this.files[0].name);

            if(fileType( obj.files[0].name ) == '.jpeg' || fileType( obj.files[0].name ) == '.jpg' || fileType( obj.files[0].name ) == '.png' || fileType( obj.files[0].name ) == '.gif'){

                mypage.showpage(document.querySelector('#mainupload'));

                isPhoto= true;
                var schedule = s('schedule');
                schedule.innerHTML = '图片上传中';
                schedule.parentNode.style.opacity = 1;
                s('addVideoLabel').innerHTML = '';
                s('addVideoLabel').innerHTML = '<h3 id="fileType">给图片加标签</h3>';
                for(var i=0;i<media.length;i++){//生成标签
                    s('addVideoLabel').innerHTML += '<span data-function="videoLabel" id="'+ media[i].id +'">'+ media[i].name +'</span>';
                };

                lexLabel = true;//判断可以添加标签
                schedule.innerHTML = '图片上传成功！';

                /*ajax('post', 'http://upload.qiniu.com/', oFormData, function( data ){//上传图片

                    var data = JSON.parse(data);
                    if(data.persistentId){
                        videoId = data.persistentId
                        getVideoImg(videoId);
                    }
                    lexLabel = true;//判断可以添加标签
                    schedule.innerHTML = '图片上传成功！';
                    lexImgUrl = php_host + data.key;
                    setTimeout(function(){
                        startMove( schedule.parentNode , { opacity : 0 } , 500 , 'easeOut');
                    },1000);
                },function( num ){
                    schedule.style.width = view().w * num + 'px';
                });*/
            }else{
                mypage.popup('请选择图片文件！');
            }
        }
    };



    function score( obj ){

        var sibling = lexSibling( obj);
        for(var i=0;i<sibling.length;i++){
            removeClass(sibling[i],'active');
        };
        var prevAll = lexPrevAll( obj,true );
        for(var i=0;i<prevAll.length;i++){
            addClass(prevAll[i],'active');
        };

        //obj.prevAll('a').addClass('active');
        //addClass(obj, 'active');
    };

};

page.prototype.getVideoImg = function( persistentId ){//获取视频截图信息
    var _this = this;
    ajax2('get', './getVideoImg.php?id=' + persistentId, '', function( data ){
        requestNum++;
        if(requestNum == 10){imgId = 'http://7xipof.com1.z0.glb.clouddn.com/video_img_novideo.jpg'; return};
        var data = JSON.parse(data);
        if(data.code == 1 || data.code == 2){
            setTimeout(function(){_this.getVideoImg(videoId);},10);
        }else if(data.code == 3 || data.code == 4){
            imgId = 'http://7xipof.com1.z0.glb.clouddn.com/video_img_novideo.jpg';
        }else{
            imgId =  php_host + data.items[0].key;
        }
    });
}

page.prototype.init = function( now ){

    //var web = document.URL;
    //if(web.indexOf("name")== -1){ setTimeout(function(){window.location = window.location + '?name=1';},100) }

    var _this = this;
    var imgList = document.getElementById('img').getElementsByTagName('ul')[0];
    var title = document.getElementById('title');
    var nowBtn = document.getElementById('nowBtn').getElementsByTagName('ul')[0];

    for(var i=0;i<nowBtn;i++){

    };

    document.body.style.height = view().h + 'px';
    if(view().h<550){
        document.body.style.height = '550px';
        var page =getByClass(document, 'div', 'page');
        for(var i=0;i<page.length;i++){
            page[i].style.height = '550px';
        };
    };

    setTimeout( function(){ sClass('.markWelcome').style.display = 'none'; },5000);
    setTimeout( function(){
        _this.showpage(now);
    },4000);

   // s('cnzz_stat_icon_1254460216').style.display="none";

    _this.bindEvent();

    _this.keyVisual( {div:'img',list:'list',nowBtn:'nowBtn',title:'title',autoPlay:3000} );
};

page.prototype.popup = function( obj ){
    var text = document.createElement('div');
        text.className = 'popup';
        text.style.width = view().w + 'px';
        text.innerHTML = obj;
    document.body.appendChild(text);
};

page.prototype.setPos = function(div, img){

    var divW = view().w;
    var divH = view().h * 0.3;

    var imgW = 0;
    var imgH = 0;
    var iMax = 0;

    img.onload = function(){
        imgW = this.width;
        imgH = this.height;
        iMax = Math.max( divW / imgW, divH / imgH );

        console.log(divW);
        console.log(divH);

        console.log(this.width);
        console.log(this.height);

        img.style.width = imgW * iMax + 'px';
        img.style.height = imgH * iMax + 'px';

        img.style.top = (divH - imgH * iMax) / 2 + 'px';
        img.style.left =  (divW - imgW * iMax) / 2 + 'px';
    };
};

page.prototype.keyVisual  = function( option ){
    var _this = this;
    var autoPlay = option.autoPlay;//是否自动滚动
    var clickPlay = option.clickPlay;//是否点击滚动
    var div = option.div;
    var list = option.list;
    var nowBtn = s(option.nowBtn).getElementsByTagName('li');
    var title = s(option.title).getElementsByTagName('span');
    var oDiv = document.getElementById(div);
    var oUl = document.getElementById(list);
    var aLi = oUl.getElementsByTagName('li');
    var w = view().w;
    var iTimer = null;
    //alert(w);

    for(var i=0;i<aLi.length;i++){
        aLi[i].style.width = w + 'px';
        _this.setPos(aLi[i],aLi[i].querySelector('img'));
    };

    oUl.style.width = aLi.length * w + 'px';

    oDiv.ontouchmove = function(ev){
        ev.preventDefault();
    };
    var downX = 0;
    var downLeft = 0;
    var iNow = 0;
    var downTime = 0;
    oUl.ontouchstart = function(ev){
        clearInterval(iTimer);
        var touchs = ev.changedTouches[0];
        downX = touchs.pageX;
        downLeft = this.offsetLeft;
        var bBtn = true;
        downTime = Date.now();
        oUl.ontouchmove = function(ev){
            var touchs = ev.changedTouches[0];
            if( this.offsetLeft >= 0 ){
                if(bBtn){
                    bBtn = false;
                    downX = touchs.pageX;
                }
                this.style.left = (touchs.pageX - downX)/3 + 'px';
            }
            else if( this.offsetLeft <= oDiv.offsetWidth - oUl.offsetWidth ){
                if(bBtn){
                    bBtn = false;
                    downX = touchs.pageX;
                }
                this.style.left = (touchs.pageX - downX)/3 + ( oDiv.offsetWidth - oUl.offsetWidth ) + 'px';
            }
            else{
                this.style.left = touchs.pageX - downX + downLeft + 'px';
            }
        };

        oUl.ontouchend = function(ev){
            var touchs = ev.changedTouches[0];
            if( touchs.pageX < downX ){   //←
                if(iNow != aLi.length-1){
                    if( downX - touchs.pageX > aLi[0].offsetWidth/2 || (Date.now() - downTime < 300 && downX - touchs.pageX > 30 ) ){
                        iNow++;
                    }
                }
                startMove( oUl , { left : - iNow * w } , 400 , 'easeOut' );
                showBtn( iNow );
            }
            else{    //→
                if(iNow != 0){
                    if( touchs.pageX - downX > aLi[0].offsetWidth/2 || (Date.now() - downTime < 300 && touchs.pageX - downX > 30 ) ){
                        iNow--;
                    }
                }
                startMove( oUl , { left : - iNow * w } , 400 , 'easeOut' );
                showBtn( iNow );
            }

            setTimeout(autoplay,1000);

            this.ontouchmove = null;
            this.ontouchend = null;
        };
    };

    function showBtn( num ){
        for(var i=0;i<nowBtn.length;i++){
            removeClass(nowBtn[i], 'active');
            removeClass(title[i], 'active');
        };
        addClass(nowBtn[num], 'active');
        addClass(title[num], 'active');
    }

    setTimeout(function(){autoPlay&&autoplay();},3000);
    function autoplay(){
        clearInterval(iTimer);
        iTimer = setInterval(function(){
            iNow++;
            if(iNow>aLi.length-1){iNow=0}
            startMove( oUl , { left : - iNow * w } , 400 , 'easeOut' );
            showBtn( iNow );
        },autoPlay);
    }
    if(clickPlay){
        var prev = oDiv.getElementsByTagName('em')[0];
        var next = oDiv.getElementsByTagName('i')[0];
        prev.ontouchend = function(){
            iNow--;
            if(iNow<0){iNow=0;}
            startMove( oUl , { left : - iNow * w } , 400 , 'easeOut' );
        }
        next.ontouchend = function(){
            iNow++;
            if(iNow>aLi.length-1){iNow=aLi.length-1}
            startMove( oUl , { left : - iNow * w } , 400 , 'easeOut' );
        }
    }
}



page.prototype.showpage = function( obj ){
    document.documentElement.scrollTop = 0;
    var  child = document.querySelectorAll('.page');
    for(var i=0;i<child.length;i++){
        child[i].style.display="none";
    };
    obj.style.display="block";
};


page.prototype.bindEvent = function(){
    var _this = this;
    bind(document,'touchstart',function( ev ){
        var ev = ev || event;
        var target = ev.target || srcElement;
        for(a in _this.clickArea){
            if(target.dataset.function == a){
                _this.clickArea[a](target);
            }
        };
    });

    bind(document,'change',function( ev ){
        var ev = ev || event;
        var target = ev.target || srcElement;
        for(a in _this.clickArea){
            if(target.dataset.function == a){
                _this.clickArea[a](target);
            }
        };
    });
};



