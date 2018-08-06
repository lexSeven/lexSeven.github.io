
function ttimg(){

    var vimg=document.getElementById("timg");
    vimg.style.width="40";

    setInterval(function(){
        if(vimg.style.width=='40px'){
            vimg.style.width="30";
        }else{vimg.style.width="40";}


    },400);

}

var tol=0;
function jcc(){
    var audio = document.getElementById('au');
    if(audio!==null){
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        //alert(audio.paused);
        if(audio.paused)                     {
            audio.play();
        }else{
            audio.pause();
        }
    }
}


function print_r(theObj) {
    var retStr = '';
    if (typeof theObj == 'object') {
        retStr += '<div style="font-family:Tahoma; font-size:7pt;">';
        for (var p in theObj) {
            if (typeof theObj[p] == 'object') {
                retStr += '<div><b>['+p+'] => ' + typeof(theObj) + '</b></div>';
                retStr += '<div style="padding-left:25px;">' + print_r(theObj[p]) + '</div>';
            } else {
                retStr += '<div>['+p+'] => <b>' + theObj[p] + '</b></div>';
            }
        }
        retStr += '</div>';
    }
    return retStr;
}
function sortArr(m,n){
    return m>n?1:(m<n?-1:0);
}
function bf(gc,songid){
    tol=tol+1;
    var zfc='';
    var g=[];
    var g2=[];
    g[tol]=gc;
    var dddc=0;
    document.getElementById("bcf").innerHTML='<div class="text-list" id="text-list'+tol+'"></div>';
    $.ajax({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
        type: 'get',
        dataType: 'jsonp',
        data: {
            format:'json',
            calback:'',
            from:'webapp_music',
            method:'baidu.ting.song.play',
            songid:songid
        },
        success: function (data1) {
            //data1.bitrate.file_link 歌曲链接   data1.songinfo.pic_premium歌曲大图 data1.songinfo.pic_big缩略图 title名 song_id歌曲ID
            document.getElementById('au').src=data1.bitrate.file_link;
            window.onload = function() {   if(document.getElementById('au').paused) {
                document.getElementById('au').play();
            }
            }
            document.getElementById("text-list"+tol).innerHTML='Loading...';
            document.getElementById("ccna").innerHTML=data1.songinfo.title;

            var sygc;

            setInterval(function(){
                zfc=Math.ceil(document.getElementById("au").currentTime);
                if(g[tol][zfc]){
                    var ss=document.getElementById("jlu").value;
                    var shu=0;
                    var shu1=0;

                    var xia='';
                    var xxgcc=Array();
                    var xxgv=Array();

                    var shangc;
//document.write(print_r(gc));

//g2[tol]=g[tol].sort(sortJ);


                    for(var key in g[tol]){
                        if(key>zfc){shu1=shu1+1;if(g[tol][key]){

                            xia+=g[tol][key]+'<br>';}}if(shu1>4){shu1=0;break;}
                    }

                    var shag=0;
                    for(var key in g[tol]){
                        shag=(shag+1);
                        if(key<zfc){if(g[tol][key]){
                            if(g[tol][key]){
                                if(g[tol][key]!='undefined'){
                                    if(g[tol][key]!=''){
                                        if(g[tol][key]!='NaN'){

                                            xxgcc[shag-1]=g[tol][key]+'<br>';

                                        }}}}
                        }}


                    }

//xxgcc.sort(sortArr);
                    shu1=0;
                    var pxxx;
                    var xsha=0;
                    for(var b=0;b<=xxgcc.length-1;b++){

                        pxxx=(xxgcc.length-1)-b;
                        //pxxx=b;
                        shu1=shu1+1;
                        if(xxgcc[pxxx]){
                            if(xxgcc[pxxx]!='undefined'){
                                if(xxgcc[pxxx]!=''){
                                    if(xxgcc[pxxx]!='NaN'){

                                        xsha=xsha+1;
//shangc+=(pxxx)+xxgcc[pxxx];
                                        xxgv[xsha-1]=xxgcc[pxxx];
                                    }
                                }
                            }
                        }if(shu1>2){shu1=0;break;}
                    }
//---
                    shu1=0;
                    for(var bb=0;bb<=xxgv.length-1;bb++){

                        pxxx=(xxgv.length-1)-bb;
                        //pxxx=b;
                        shu1=shu1+1;
                        if(xxgv[pxxx]){
                            if(xxgv[pxxx]!='undefined'){
                                if(xxgv[pxxx]!=''){
                                    if(xxgv[pxxx]!='NaN'){

                                        shangc+=xxgv[pxxx];
                                    }
                                }
                            }
                        }if(shu1>2){shu1=0;break;}
                    }



                    if(ss!=document.getElementById("jlu").value){ document.getElementById("jlu").value=g[tol][zfc];}

                    sygc=document.getElementById("sgc").value;

                    document.getElementById("text-list"+tol).innerHTML=shangc.replace(/undefined/i,"")+ss+'<font style="color:0000ff" id="ygc">'+g[tol][zfc]+'</font><br>'+xia;


                }


            },10);




            //document.write(print_r(data1));
        }
    });

}

function lrc(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}

//


function audiopay(songid){

    $.ajax({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
        type: 'get',
        dataType: 'jsonp',
        data: {
            format:'json',
            calback:'',
            from:'webapp_music',
            method:'baidu.ting.song.lry',
            songid:songid
        },
        success: function (data) {
            //document.write(data.title);

            bf(lrc(data.lrcContent),songid);




            //

        }
    });

}

//audiopay(877578);// 播放器测试---安林网络
function soo(qury){
    $.ajax({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
        type: 'get',
        dataType: 'jsonp',
        data: {
            format:'json',
            calback:'',
            from:'webapp_music',
            method:'baidu.ting.search.catalogSug',
            query:qury
        },
        success: function (data2) {
            var vv=0;
            for(var key in data2.song){
                // document.write();

                vv=vv+1;    document.getElementById('sslist').innerHTML='<a style="float:left;display:block;line-height:25px;width:70%" class="music-row" href="javascript:void(0)" id="gli'+vv+'" title="'+data2.song[key].songid+'" src="0" onclick="audiopay('+data2.song[key].songid+');document.getElementById(\'gqid\').value='+vv+';fx(this.id);">'+data2.song[key].songname+'('+data2.song[key].artistname.replace(/\,/g,"•")+')</a>'+document.getElementById('sslist').innerHTML;

            }







        }
    });
}
//soo('周杰伦');//搜索函数测试---安林网络
function purl(url){
    history.pushState("","",url);
}
var ccid='';
var yu=window.location.host;
var mu=window.location.pathname;
var tvv='';

function fx(tii){

    var thii=document.getElementById(tii);

    if(thii.innerHTML.indexOf("√已选择") <1){
        thii.innerHTML=thii.innerHTML+'√已选择';
        ccid+=thii.title+'='+thii.innerHTML+',';
        thii.style.color="#ff0000";
        tvv+=thii.innerHTML+',';
    }else{
        thii.style.color="#000000";
        thii.innerHTML=thii.innerHTML.replace("√已选择", "");
        ccid=ccid.replace(thii.title+'='+thii.innerHTML+',', "");
        tvv=tvv.replace(thii.innerHTML+',',"");

    }
    ccid=ccid.replace("√已选择", "");
    purl(mu+'?fx='+ccid);
    document.title='我点了歌曲送给你们，歌单: '+tvv;

}
