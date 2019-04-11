;(function() {
    var shopHeadZ = document.createElement('div');
    shopHeadZ.className = 'shopHeadZ';
    var shopFootZ = document.createElement('div');
    shopFootZ.className = 'shopFootZ';
    document.querySelector('.activtyApp_c').prepend(shopHeadZ);
    document.querySelector('.activtyApp_c').append(shopFootZ);



    var shopHeadCss = '<style>.nowrap_1{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.shopPops{display:none;width:100%;height:100%;background-color:rgba(0,0,0,0.3);position:fixed;top:0;left:0;z-index:5000;}.shopPops .shopPops_bg{width:6.666667rem;height:6.666667rem;position:absolute;left:50%;top:50%;margin:-3.333333rem 0 0 -3.333333rem;box-sizing:border-box;background-size:100%;}.shopPops .shopPops_bg{width:6rem;height:7.466667rem;margin:-4.266667rem 0 0 -2.933333rem;background-size:100% 100%;}.shopPops .shopPops_subtime{width:100%;height:100%;text-align:center;}.shopPops .shopPops_close{position:absolute;top:7.475rem;left:50%;margin-left:-0.5rem;width:0.973333rem;height:1.906667rem;background:url(//pic12.secooimg.com/res/common/imgData/colse.png) no-repeat;background-size:100%;}.shopPops_close{top:7.466667rem;}.shop1px,.shopFoot1px{width:100%;height:0;}.shop1px:before,.shopFoot1px:before{content:"";position:absolute;top:-50%;bottom:-50%;left:-50%;right:-50%;-webkit-transform:scale(0.5);transform:scale(0.5);border-bottom:1px solid #e1e1e1;}.shopHeadZ{width:100%;height:1.866667rem;}.shopHeadFixed {position: fixed;}.shopHead{top:0;width:100%;height:1.573333rem;padding-top:0.293333rem;background-color:#fff;z-index:3001;}.shopHead>div{float:left;}.shopLogo{width:1.28rem;height:1.28rem;margin:0 0.266667rem 0 0.266667rem}.shopLogo img{display:block;width:1.253333rem;height:1.253333rem;margin:0.013333rem;border-radius:0.133333rem;border:1px solid #e1e1e1;}.shopInfo{width:4.666667rem;height:1.586666rem;margin:0.0266667rem 0.133333rem 0 0;}.shopInfoName{width:100%;height:0.56rem;line-height:0.56rem;font-size:0.4rem;font-family:"Futura-Medium";}.shopInfoLogo{width:100%;}.shopInfoLogo span{display:block;float:left;}.qjdLogo{width:0.96rem;height:0.373333rem;margin:0.186667rem 0.133333rem 0 0;}.merchant{height:0.453333rem;line-height:0.5rem;font-size:0.32rem;font-family:"PingFangSC-Light";margin-top:0.146667rem;padding-right:0.346667rem;background-image:url("//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/merchant.png");background-position:100% 50%;background-size:0.293333rem 0.293333rem;background-repeat:no-repeat;}.shopSearch{width:1rem;padding-left:0.33rem;border-radius:0.5rem;background:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/shopSearch.png) no-repeat 0.133333rem 50% / 0.313333rem 0.313333rem;}.shopSearch:before{content:"";position:absolute;top:-50%;bottom:-50%;left:-50%;right:-50%;-webkit-transform:scale(0.5);transform:scale(0.5);border-radius:1rem;border:1px solid #999;}.shopHead .shopFollow{float:right;width:1.653333rem;height:0.72rem;margin-right:0.266667rem;}.shopSearch,.shopFollow p{height:0.72rem;line-height:0.77rem;font-size:0.32rem;font-family:"PingFangSC-Medium";text-align:center;border-radius:0.5rem;}.shopFollow p{display:none;width:100%;background-size:100%;}.shopHead .active{display:block;}.shopFollow .shopFollowEnd{color:#fff;background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/collect_1.png);}.shopFollow .shopFollowNo{background-color:#eee;}.shopTicketPrice{width:100%;height:1.52rem;line-height:1.52rem;padding-top:2.8rem;}.shopTicketPrice span{color:#dc0400;}.shopTicketPrice span:nth-child(1){width:0.48rem;height:0.666667rem;line-height:0.666667rem;font-size:0.48rem;font-family:"PingFangSC-Medium";}.shopTicketPrice span:nth-child(2){display:inline-block;height:1.52rem;line-height:1.52rem;font-size:1.173333rem;font-family:"Futura-Medium";}.shopTicketPrice2{width:100%;height:0.48rem;line-height:0.48rem;font-size:0.345067rem;font-family:"PingFangSC-Light";color:#999;letter-spacing:0.013333rem;}.searchQjd_text{width:100%;height:100%;box-sizing:border-box;padding:0.186667rem 1.2rem;}.searchQjd_text_old{padding:0.186667rem 0.4rem;}.searchQjd_text div{width:100%;height:100%;box-sizing:border-box;padding-left:1.013333rem;background:#f5f5f5 url(//pic12.secooimg.com/res/common/imgData/search.png) no-repeat 0.426667rem 0.186667rem;opacity:0.8;background-size:0.666667rem;font-size:0.373333rem;line-height:0.853333rem;color:#999;}.searchQjd_bg{display:none;position:fixed;top:0;width:100%;height:100%;z-index:5000;background-color:#fff;pointer-events:auto;}.searchQjd_bg .searchQjd_text{width:85%;height:1.2rem;padding-left:0.4rem;padding-right:0;}.searchQjd_bg input{width:90% 0.346667rem;height:100%;background:transparent;font-size:0.373333rem;opacity:0.8;border:none;-webkit-appearance:none;vertical-align:middle;font-family:inherit;}input[type="search"]::-webkit-search-cancel-button{display:none;}.searchQjd_bg input:focus{border:0;outline:none;}.searchQjd_bg span{top:0;right:0;width:15%;height:1.2rem;line-height:1.2rem;text-align:center;font-size:0.426667rem;position:absolute;}</style>';
    var shopFootCss = '<style>.shopFootZ{width:100%;height:1.306667rem;}.shopFoot{position:fixed;bottom:0;width:100%;height:1.306667rem;background-color:#fff;z-index:200;}.shopFoot ul{width:100%;height:100%;}.shopFootItem{float:left;width:1.013333rem;height:100%;margin:0 1.349667rem 0 1.0rem;}.shopFootItemR{margin-right:0;}.shopFootItem span{display:block;text-align:center;font-size:0.293333rem;font-family:"PingFangSC-Light";}.shopFooticon{width:0.773333rem;height:0.773333rem;margin:0.08rem auto 0;background-size:100% 100%;}.shopFootItem.hover span{color:#cd0000;}.shopFootindex{background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/indexNormal.png);}.shopFootItem.hover .shopFootindex{background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/indexPress.png);}.shopFootfind{background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/findNormal.png);}.shopFootItem.hover .shopFootfind{background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/findPress.png);}.shopFootlist{background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/listNormal.png);}.shopFootItem.hover .shopFootlist{background-image:url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/listPress.png);}@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3){.shopFootZ,.shopFoot{height:1.76rem;}}@media only screen and (device-width:414) and (device-height:896px) and (-webkit-device-pixel-ratio:3){.shopFootZ,.shopFoot{height:1.76rem;}}@media only screen and (device-width:414) and (device-height:896px) and (-webkit-device-pixel-ratio:2){.shopFootZ,.shopFoot{height:1.76rem;}}</style>';
    var shopHeadHtml = '<div class="shopHead clearfix">\
                            <div class="por shopLogo">\
                                <img class="por" src="//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/indexPress.png" alt="">\
                            </div>\
                            <div class="shopInfo"></div>\
                            <div class="shopSearch por">鎼滅储</div>\
                            <div class="shopFollow">\
                                <p class="shopFollowEnd">鍏虫敞鏈夌ぜ</p>\
                                <p class="shopFollowNo">宸插叧娉�</p>\
                            </div>\
                            <div class="shop1px por"></div>\
                            <div class="shopPops"> \
                                <div class="shopPops_bg" style="background-image: url(//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/shopPops.png)">\
                                    <div class="shopPops_subtime">\
                                        <p class="shopTicketPrice">\
                                            <span>锟�</span>\
                                            <span class="shopTicketPrice1">50</span>\
                                        </p>\
                                        <p class="shopTicketPrice2">[婊�3000鍏冨彲鐢╙</p>\
                                    </div>\
                                    <div class="shopPops_close"></div>\
                                </div>  \
                            </div>\
                            <div class="searchQjd_bg">\
                                <div class="searchQjd_text ">\
                                    <div>\
                                        <form action="" method="get" onsubmit="return false">\
                                            <input type="searchQjd" name="keyword" placeholder="搴楀唴鎼滅储" autocomplete="off" autocorrect="off" maxlength="40" autofocus="autofocus">\
                                        </form>\
                                    </div>\
                                    <span>鍙栨秷</span>\
                                </div>\
                            </div>\
                        </div>';
    var shopFootHtml = '<ul class="shopFoot por clearfix">\
                            <p class="shopFoot1px por"></p>\
                        </ul>';
    $(".shopHeadZ").html(shopHeadCss+shopHeadHtml);
    $(".shopFootZ").html(shopFootCss+shopFootHtml);
    var page = {
        upk: '',
        storeId: app.getQueryString("storeId"),
        ticketId: app.getQueryString("ticketId"),
        shopTab: app.getQueryString("tab") || 1,
        shopTabPage1: app.getQueryString("shopTabPage1") || "",
        shopTabPage2: app.getQueryString("shopTabPage2") || "",
        shopTabPage3: app.getQueryString("shopTabPage3") || "",
        shopLogo: $(".shopLogo"),
        shopInfo: $(".shopInfo"),
        shopFollowEnd: $(".shopFollowEnd"),
        shopFollowNo: $(".shopFollowNo"),
        shopPops: $(".shopPops"),
        shopPopsSubtime: $(".shopPops_subtime"),
        shopPopsClose: $(".shopPops_close"),
        shopFoot: $(".shopFoot"),
        win: $(window),
        toastTrue: false,
        retCode: false,
        init: function() {
            var that = this;
            that.getShopInfo(function(){
                that.qualification();
            });
            //鑾峰彇upk
            app.getUpk(function(upk) {
                that.upk = upk;
                if (that.upk) {
                    that.getCollect();
                }else {
                    that.shopFollowEnd.addClass('active');
                    that.ticketId ? that.shopFollowEnd.text("鍏虫敞鏈夌ぜ") : that.shopFollowEnd.text("鍏虫敞搴楅摵");
                    that.getlogin();
                }
            });

            that.shopPopsSubtime.on('tap', function() {
                that.shopPops.removeClass('active');
                that.shopFollowEnd.trigger('tap');
            });

            that.shopPopsClose.on('tap', function(){
                that.shopPops.removeClass('active');
            });

            that.shopFoot.append('<li class="shopFootItem shopFootItem1 eventChild" eventdata={"type":"page","url":"'+ that.shopTabPage1 +'"}><span class="shopFooticon shopFootindex" ></span><span>棣栭〉</span></li>'+
                '<li class="shopFootItem shopFootItem2 eventChild '+ (that.shopTab == 2 ? 'noEvent' : '' )+'" eventdata={"type":"page","url":"shopHeader2","params":"tab=2&shopTabPage1=' + that.shopTabPage1 + '&storeId=' + that.storeId + '&ticketId=' + that.ticketId + '"}><span class="shopFooticon shopFootfind"></span><span>灏忓彂鐜�</span></li>'+
                '<li class="shopFootItem shopFootItem3 shopFootItemR eventChild '+ (that.shopTab == 3 ? 'noEvent' : '' )+'" eventdata={"type":"page","url":"shopHeader3","params":"tab=3&shopTabPage1=' + that.shopTabPage1 + '&storeId=' + that.storeId + '&ticketId=' + that.ticketId + '"}><span class="shopFooticon shopFootlist"></span><span>鍒嗙被</span></li>')

            $(".shopFootItem" + that.shopTab).addClass('hover');

            that.getText();

            that.win.scroll(function(){
                var winTop = that.win.scrollTop();
                if (winTop >= $(".shopHeadZ").offset().top) {
                    $(".shopHead").addClass('shopHeadFixed');
                } else {
                    $(".shopHead").removeClass('shopHeadFixed');
                }
            })
        },
        // 鍚婅捣鐧诲綍
        getlogin:function() {
            var that = this;
            that.shopFollowEnd.on('tap.login', function(){
                app.login(function(upk) {
                    app.getUpk(function(upk) {
                        that.upk = upk;
                        that.shopFollowEnd.off('tap.login');
                        that.getCollect(function(){});   //鑾峰彇鏈夋病鏈夋敹钘忕殑鎺ュ彛
                    })
                })
            });
        },
        // 鑾峰彇搴楅摵淇℃伅
        //http://apidoc.siku.cn/workspace/myWorkspace.do?projectId=396#2574
        getShopInfo:function(callback) {
            var that = this;
            var storeModel = {
                "1" : "鑷惀搴�",
                "2" : "涓撹惀搴�",
                "3" : "涓撳崠搴�",
                "4" : "鏃楄埌搴�"
            };

            $.ajax({
                type: 'GET',
                url: '//topstore.secoo.com/api/store/info',
                dataType: 'json',
                data: {
                    storeId: that.storeId,
                },
                success: function(data) {
                    if (!data.retCode) {
                        // data.data.vendorId = 1000200;
                        that.vendorId = data.data.vendorId;
                        that.shopLogo.html('<img class="por" src="//pic12.secooimg.com/'+  data.data.storeLogo +'" alt="">');
                        that.shopInfo.html('<p class="shopInfoName nowrap_1">'+ data.data.storeName +'</p> <p class="shopInfoLogo clearfix"><span class="qjdLogo"><img src="//pic16.secooimg.com/imagesNew/featuresPic/gxd_vuePro/storeModel'+ [data.data.storeModel] + '.png"></span></p>');

                    }else {
                        app.toast("retMsg");
                    }
                    callback && callback();
                }
            });
        },
        // 鏌ヨ鏄惁鏀惰棌
        //http://apidoc.siku.cn/workspace/myWorkspace.do?projectId=396#2573
        getCollect:function() {
            var that = this;
            $.ajax({
                type: 'GET',
                url: '//las.secoo.com/api/favorite/get_store',
                dataType: 'jsonp',
                data: {
                    storeId: that.storeId,
                    upk: that.upk,
                },
                success: function(data) {
                    if (!data.retCode) {
                        if (data.collectFlag == 1) {
                            that.shopFollowNo.addClass('active');
                        } else {
                            that.shopFollowEnd.addClass('active');
                            that.retCode = true;
                        }
                        that.discount(function(){
                            that.ticketInfo();
                        });
                    }else {
                        app.toast(data.retMsg);
                    }

                    that.clickCollect(that.shopFollowEnd, true);   // 鐐瑰嚮鏀惰棌
                    that.clickCollect(that.shopFollowNo, false);
                }
            });
        },
        // 璋冪敤鏀惰棌鎺ュ彛锛屽皝瑁呭嚱鏁�
        //http://apidoc.siku.cn/workspace/myWorkspace.do?projectId=396#2572
        clickCollect:function (element, Boolean) {
            var that = this;
            element.on('tap', function() {
                $.ajax({
                    type: 'GET',
                    url: '//las.secoo.com/api/favorite/collect_store',
                    dataType: 'jsonp',
                    data: {
                        storeId: that.storeId,
                        upk: that.upk,
                        isCollect: Boolean
                    },
                    success: function(data) {
                        if (data.retCode == 0) {
                            element.removeClass('active');
                            element.siblings().addClass('active');
                            Boolean && that.toastTrue++
                            if (that.toastTrue == 1 && Boolean) {
                                that.clickDiscount();
                            } else if (that.toastTrue > 1 && Boolean) {
                                app.toast('鍏虫敞鎴愬姛');
                            }
                            discount();
                        } else {
                            that.upk && app.toast('璇烽噸璇�');
                        }
                    }
                })
            });
        },
        // 鑾峰彇鏈夋病鏈夐鍙栦紭鎯犲埜
        //http://apidoc.siku.cn/workspace/myWorkspace.do?projectId=231#1937
        discount:function (callback) {
            var that = this;
            $.ajax({
                type: 'GET',
                url: '//las.secoo.com/api/activity/newactivity/query_activity',
                dataType: 'jsonp',
                data: {
                    aid: that.ticketId,
                    upk: that.upk
                },
                success: function(data) {
                    that.toastTrue = data.retCode == 0 ? 0 : 1;
                    !data.retCode ? that.shopFollowEnd.text("鍏虫敞鏈夌ぜ") : that.shopFollowEnd.text("鍏虫敞搴楅摵");
                    if (!data.retCode && that.retCode) {
                        that.shopPops.addClass('active');
                        callback && callback();
                    }
                }
            })
        },
        // 鏍规嵁娲诲姩鏌ヨ浼樻儬鍒镐俊鎭�
        //http://apidoc.siku.cn/workspace/myWorkspace.do?projectId=231#1247
        ticketInfo:function (){
            var that = this;
            $.ajax({
                type: 'get',
                url: '//las.secoo.com/api/activity/newactivity/activity_ticket_info',
                dataType: "jsonp",
                data: {
                    aid: that.ticketId,
                },
                success: function(data) {
                    if (!data.retCode) {
                        $(".shopTicketPrice1").text(data.data.typeMoney);
                        $(".shopTicketPrice2").text("[婊�"+ data.data.minOrderAmount +"鍏冨彲鐢╙");
                    } else {
                        app.toast(data.retMsg);
                    }
                }
            })
        } ,
        // 鐐瑰嚮棰嗗彇浼樻儬鍒�
        //http://apidoc.siku.cn/workspace/myWorkspace.do?projectId=231#1247
        clickDiscount:function () {
            var that = this;
            $.ajax({
                type: 'get',
                url: '//las.secoo.com/api/activity/newactivity/share_get_new',
                dataType: "jsonp",
                data: {
                    aid: that.ticketId,
                    upk: that.upk
                },
                success: function(data) {
                    if (data.retCode) {
                        app.toast("宸查鍙栫鍒�");
                    } else {
                        app.toast(data.retMsg);
                    }
                }
            })
        },
        //鏌ヨ鏄惁鏈夊晢瀹惰祫璐�
        //http://doc.secoo.com/workspace/myWorkspace.do?projectId=74#1470
        qualification:function() {
            var that = this;
            // $(".shopInfoLogo").append('<span class="merchant eventChild" eventdata={"type":"page","url":"qualification","params":"vid='+ that.storeId +'"}>搴楅摵淇℃伅</span>')
            $.ajax({
                type: 'GET',
                url: '//las.secoo.com/api/product/qualification',
                dataType: 'jsonp',
                data: {
                    type: 1,
                    vid: that.vendorId,
                },
                success: function(data) {
                    if (!data.retCode) {
                        data.showFlag ? $(".shopInfoLogo").append('<span class="merchant eventChild" eventdata={"type":"page","url":"qualification","params":"vid='+ that.vendorId +'"}>搴楅摵淇℃伅</span>') : "";
                    }
                }
            });
        },
        getText:function() {
            var that = this;
            var header = $("#header");
            var searchQjd = $('.searchQjd');
            var search_div = $(".shopSearch");
            var searchQjd_text = $(".searchQjd_text");
            var searchQjd_bg = $('.searchQjd_bg');
            var search_input = searchQjd_bg.find('input').eq(0);
            var search_hide = searchQjd_bg.find('span').eq(0);
            // 鐐瑰嚮鍚婅捣杈撳叆妗�
            search_div.click(function() {
                header.css("z-index","111");
                header.addClass('head_none');
                searchQjd_bg.addClass('active');
                searchQjd_text.trigger('click').focus();
                search_input.focus();
            });
            // 鍏抽棴杈撳叆妗�
            $(".searchQjd_bg, .searchQjd_bg span").on('tap', function(e) {
                header.css("z-index","334");
                searchQjd_bg.removeClass('active');
                search_input.val('').blur();
            });
            //
            searchQjd_text.tap(function () {
                event.stopPropagation();
            });


            // 鎼滅储缁撴灉鎻愪氦
            search_input.keydown(function(e) {
                var searchVal = search_input.val().trim();
                if(e.keyCode === 13 ) { // 鍥炶溅閿�
                    if (searchVal !== '') { // 鍊间笉鏄┖
                        app.goPage({
                            type: 'keyword',
                            url: searchVal,
                            params: 'storeId=' + that.storeId,
                        });
                        search_input.val('');
                    }
                };
            });

            search_input.tap(function(e) {
                e.stopPropagation();
            })

            searchQjd_bg.on('touchmove', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    };
    page.init();
})();