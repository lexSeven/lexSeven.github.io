var app = (function(win, doc) {

    var href = win.location.href,									//当前页链接
        search = win.location.search,								//当前页参数
        host = '//m.secoo.com/',									//根host
        iosHost = "iphone.secoo.com",								//host：iosApp
        androidHost = "android.secoo.com",							//host：androidApp
        curHost = win.location.host,								//当前页host
        ua = win.navigator.userAgent,								//浏览器标识
        protocol = location.protocol,								//当前页面网络协议
        pageConfig = win.pageConfig,								//全局配置信息
        openDebug = pageConfig.openDebug, 							//是否开启debug模式
        initLoad = pageConfig.initLoad, 							//是否展示顶部下载条
        initHead = pageConfig.initHead, 							//m站是否展示头部信息
        windowWidth = win.screen.width,								//屏幕寬度
        windowHeight = win.screen.height,							//屏幕高度
        supportWebp = doc.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0,	//判断是否支持webp图片格式
        wapHost = (function() {										//m站生成随机host，用于分享和跳转，防止域名被封
            return 'activity' + Math.floor((Math.random() * 2) + 1);
        })(),
        programTypes = {											//小程序类型集合，不同的小程序会在url中携带不懂参数，h5页面通过url中的参数判断当前是位于什么小程序（百度小程序特殊，通过ua判断）
            miniProgram: 'deviceType=miniProgram',
            zhifubaoProgram: 'deviceType=zhifubaoProgram',
            douyinProgram: 'deviceType=douyinProgram',
            baiduProgram: 'deviceType=baiduProgram'
        };
    var	comm = {													//页面底层核心对象
        isInit: false,												//页面是否已初始化，一些方法只在初始化时执行一次
        canGoPage: true,
        androidVersion: '6.0.12',									//安卓新旧版本的版本号分界（大于此版本，均调用新native方法）
        iosVersion: '6.0.14',										//ios新旧版本的版本号分界（大于此版本，均调用新native方法）
        //系统提示
        systemMsg: {
            fnUndefined: '该方法未注册',
            noUseNativeFn: '请在寺库app内体验该功能',
            appVersionIsLow: '您的app版本过低，请升级至最新版本'
        },

        //html模板集合
        template: {
            //m站toast提示
            toastTpl: '<div class="toast"><span></span></div>',

            //m站顶部标题栏
            headBarTpl: '<header id="header">\
							<div class="leftBtn header_icon_back header_iconfont"></div>\
							<h1 class="title"></h1>\
							<div class="rightBtn por">\
								<span class="icon header_iconfont header_icon_menu"></span>\
								<ul class="bindEventList"></ul>\
							</div>\
						</header>',
        },

        //模板所需数据集合
        templateData: {
            //m站顶部标题栏数据
            headBarData: [
                {
                    className: 'header_iconfont header_icon_index',
                    urlType: 'url',
                    url: '//m.secoo.com',
                    innerHtml: '首页',
                },
                {
                    className: 'header_iconfont header_icon_bag',
                    urlType: 'url',
                    url: '//m.secoo.com/v1/shoppingCart/',
                    innerHtml: '购物袋',
                },
                {
                    className: 'header_iconfont header_icon_my',
                    urlType: 'url',
                    url: '//m.secoo.com/user.html',
                    innerHtml: '我的寺库',
                }
            ]
        },

        //页面加载所需的js
        jsArr: {
            defaultJs: [
                '//mstatic.secooimg.com/activity2018/js/comm/zepto.min.js',
            ],
            ios: [
                '//mstatic.secooimg.com/activity2018/all_min/js/WebViewJavascriptBridge_ios.min.js',
                '//mstatic.secooimg.com/activity2018/js/comm/md5.js'
            ],
            android: [],
            wap: [
                '//mstatic.secooimg.com/activity2018/js/sdk/weixin.sdk1.3.2.js',
            ],
            miniProgram: [
                '//mstatic.secooimg.com/activity2018/js/sdk/weixin.sdk1.3.2.js',
            ],
            baiduProgram: [
                '//b.bdstatic.com/searchbox/icms/searchbox/js/swan.js',
            ],
            douyinProgram: [
                '//mstatic.secooimg.com/activity2018/js/sdk/douyin.sdk1.0.0.js'
            ]
        },

        //添加统计js
        statistic: {
            google: function() {
                win.ga && "function" == typeof win.ga || (!function(g, d, j, h, c, f, b) {
                    g.GoogleAnalyticsObject = c,
                        g[c] = g[c] || function() {
                            (g[c].q = g[c].q || []).push(arguments)
                        },
                        g[c].l = 1 * new Date,
                        f = d.createElement(j),
                        b = d.getElementsByTagName('head')[0],
                        f.async = 1,
                        f.src = h,
                        b.appendChild(f, b)
                }(win, doc, "script", "//www.google-analytics.com/analytics.js", "ga"),
                    ga("create", "UA-67552012-1", "auto"),
                    ga("require", "displayfeatures"),
                    ga("require", "linkid", "linkid.js"),
                    ga("send", "pageview"));

                return this;
            },
            baidu: function() {
                win._hmt = win._hmt || [];
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?1a9931d6b2f70b8919e322ffa17dbfe5";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);

                return this;
            },
            sensors: function(para) {
                var p = para.sdk_url,
                    n = para.name,
                    w = window,
                    d = document,
                    s = 'script',
                    x = null,
                    y = null;
                w['sensorsDataAnalytic201505'] = n;
                w[n] = w[n] || function(a) {
                    return function() {
                        (w[n]._q = w[n]._q || []).push([a, arguments]);
                    }
                };
                var ifs = ['track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'getAppStatus'];
                for (var i = 0; i < ifs.length; i++) {
                    w[n][ifs[i]] = w[n].call(null, ifs[i]);
                }
                if (!w[n]._t) {
                    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
                    x.async = 1;
                    x.src = p;
                    x.setAttribute('charset', 'UTF-8');
                    y.parentNode.insertBefore(x, y);
                    w[n].para = para;
                }

                sensors.quick('autoTrack');
            }
        },

        //工具方法
        tools: {
            /* 	类型检测
             *	@params obj 	为被检测对象
             *	@params target 	为检测对象的类型，参数存在时，返回布尔值。target不传时，返回该检测对象的类型
             */
            typeof: function(obj, target) {
                var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
                return target? type === target: type;
            },

            /*	对象深度合并（修改原对象并返回）
             *	@params target 	原对象
             *	@params obj 	需合并的对象
             *	@params deep 	默认值为true，开启深度合并，相同属性新属性默认会覆盖原对象上的同名属性，设置为false时，新属性为空则不覆盖同名属性
             */
            deepMerge: function(target, obj, deep) {
                var that = this;
                var deep = deep === 'notDeep'? false: true;
                for(var key in obj) {
                    var curValue = target[key];
                    if(deep || obj[key]) {
                        target[key] = curValue && that.typeof(curValue, 'object')? comm.tools.deepMerge(curValue, obj[key]): obj[key];
                    }
                }
                return target;
            },

            //js文件合并 返回新数组
            concatJs: function(option) {

                var fn = comm.exports;
                var curDeviceType = fn.getDeviceType();						//当前设备类型
                var curDeviceTypeJs = comm.jsArr[curDeviceType];			//当前设备类型js
                var defaultJs = comm.jsArr.defaultJs;						//默认js
                var arr = [];												//页面初始化自定义加载的js

                //如果开启debug模式，则加载eruda.js
                if(openDebug || fn.getQueryString('openDebug') == 1) {
                    defaultJs.unshift('//mstatic.secooimg.com/activity2018/js/comm/eruda.min.js');
                }

                //如果开启顶部下载条 或 url参数fromShare为1，即加载顶部下载js
                if(curDeviceType == 'wap' && (initLoad || fn.getQueryString('fromShare') == 1) && (initLoad + '' !== 'false')) {
                    defaultJs.push('//mstatic.secooimg.com/m_secoo/v1/common/js/utils/dlApp.min.js');
                }

                //新版本的安卓 jsBridge.js 需要单独引入
                comm.exports.matchVersion({android: comm.androidVersion}, function() {
                    defaultJs.push('//mstatic.secooimg.com/activity2018/all_min/js/WebViewJavascriptBridge_android.min.js');
                }, function() {

                    //防止旧版jsBridge不存在的问题
                    if(!window.Jsbridge) {
                        defaultJs.push('//mstatic.secooimg.com/activity2018/all_min/js/jsBridge_android_old.min.js');
                    }

                    //增加兼容js，将兼容旧版的js拆分出来，易于维护
                    defaultJs.push('//mstatic.secooimg.com/activity2018/all_min/js/compatible.min.js');
                });

                //增加兼容js，将兼容旧版的js拆分出来，易于维护
                comm.exports.matchVersion({ios: comm.iosVersion}, function() {}, function() {
                    defaultJs.push('//mstatic.secooimg.com/activity2018/all_min/js/compatible.min.js');
                });

                if(option) {
                    switch (this.typeof(option)) {
                        case 'object':
                            if(option[curDeviceType]) {
                                arr = arr.concat(option[curDeviceType])
                            }
                            break;
                        case 'array':
                            arr = arr.concat(option)
                            break;
                        case 'string':
                            arr.push(option)
                            break;
                    }
                }
                return defaultJs.concat(curDeviceTypeJs, arr);
            },
        },

        //设置页面rem
        setRem: function(baseVal) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = clientWidth / baseVal + 'px';
                };
            recalc();
            if(!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        },

        //扩展原生方法
        extendOriginObj: function() {

            /*替换全部字符串
             *@params targetStr 	目标字符
             *@params replaceStr 	替换后的字符
             *@params isCase		是否忽略大小写，默认不忽略
             *@return 				返回处理好的字符串
             */
            String.prototype.replaceAll = function(targetStr, replaceStr, isCase) {
                return RegExp.prototype.isPrototypeOf(targetStr)? this.replace(targetStr, replaceStr): this.replace(new RegExp(targetStr, isCase? "gi": "g"), replaceStr)
            };

            //去除空格
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, "");
            };

            //日期对象格式初始化
            Date.prototype.format = function(format) { //yyyy-MM-dd hh:mm:ss
                var date = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S+": this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                    }
                }
                return format;
            }
        },

        //对外暴露属性/方法接口对象
        exports: {

            /*==================对外暴露属性集==================*/
            /*======================start======================*/
            newVersion: false,															//是否为新版本app，默认false
            href: href,																	//当前页链接
            search: search,																//当前页参数
            deviceType: {
                //baiduProgram: ua.indexOf("baiduboxapp") > -1,							//百度小程序
                baiduProgram:  href.indexOf(programTypes.baiduProgram) > -1,			//百度小程序
                miniProgram: href.indexOf(programTypes.miniProgram) > -1,				//微信小程序
                douyinProgram: href.indexOf(programTypes.douyinProgram) > -1,			//抖音小程序
                zhifubaoProgram: href.indexOf(programTypes.zhifubaoProgram) > -1,		//支付宝小程序
                weixin: !!ua.match(/MicroMessenger/i),									//微信
                android: ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1,			//android设备
                ios: ua.indexOf("iPhone") > -1,											//ios设备
                androidApp: ua.indexOf("AndroidApp") > -1 || androidHost == curHost,	//android寺库APP
                iosApp: ua.indexOf("Secoo-iPhone") > -1 || iosHost == curHost,			//ios寺库APP
                inApp: '',																//是否在app内
            },
            supportWebp: supportWebp,													//判断是否支持webp图片格式
            uuid: doc.querySelector('body').getAttribute('uuid'),						//页面在erp后台的id
            pageid: '',																	//页面id
            shareParams: {																//默认分享参数
                title: doc.querySelector('title') && doc.querySelector('title').innerHTML,
                des: '刚刚在寺库看到一个活动，太赞了！小伙伴们快来围观！全球直采，又快又省！',
                imgUrl: 'https://mstatic.secooimg.com/activity2018/all_min/img/secoo_logo.jpg',
                url: href.replace(/(\/\/android\.|\/\/iphone\.)/ig, '\/\/m\.'),
                noToast: false
            },
            // upk: '',
            /*==================对外暴露属性集==================*/
            /*=======================end=======================*/


            /*=================外部js方法注册与调用==============*/
            /*======================start======================*/
            regHandle: function(param1, param2) {
                var that = this;
                var tools = comm.tools;
                switch (tools.typeof(param1)) {
                    case 'object':
                        tools.deepMerge(that, param1);
                        break;
                    case 'string':
                        var fn = that[param1];
                        that[param1] = fn? fn: param2;
                        break;
                }
            },
            callHandle: function(type, arg) {
                var fn = this[type];
                return fn? fn(arg): console.error(type + ':' + comm.systemMsg.fnUndefined);
            },
            /*=================外部js方法注册与调用==============*/
            /*========================end======================*/


            /*====================dom相关操作==================*/
            /*======================start======================*/
            //获取dom元素
            getDom: function(dom, returnAll) {
                return returnAll? doc.querySelectorAll(dom): doc.querySelector(dom);
            },

            /*	创建dom元素(不可创建img元素，未做onload事件处理)
             * 	@param option.dom 			创建的dom名
             * 	@param option.attrs 		dom属性设置 JSON格式的键值对
             *  @param option.fatherDom 	所创建dom放在哪个父级元素里（不指定父元素，则默认加在head里）
             *  @param option.callback		dom创建完成后执行的回调
             */
            creatDom: function(option) {
                var that = this;
                var dom = option.dom;
                var callback = option.callback;
                var attrs = option.attrs;
                var url = attrs? attrs.url: option.url;
                var ele = doc.createElement(dom);
                var config = {
                    script: {
                        src: url,
                        type: 'text/javascript'
                    },
                    link: {
                        href: url,
                        rel: 'stylesheet'
                    }
                };

                option.async && (config.script.async = option.async);

                that.getDom(option.fatherDom || 'head').appendChild(that.setDomAttr(ele, config[dom] || option.attrs))

                if(config[dom]) {
                    ele.onload = function() {
                        callback && callback(ele);
                    }
                } else {
                    callback && callback(ele);
                }
            },

            //设置dom属性 返回值为设置好属性后的dom
            setDomAttr: function(dom, attrs) {
                for(var key in attrs) {
                    dom.setAttribute(key, attrs[key]);
                }
                return dom;
            },
            /*====================dom相关操作==================*/
            /*=======================end=======================*/


            /*==================与native交互方法================*/
            /*======================start======================*/
            /* 	对比app版本号
             *	@params versionObj	为app的目标版本号，{ios:'6.0.0',android:'6.0.1'}
             *	@params callback 	对比版本号后执行的回调
             */
            matchVersion: function(versionObj, callback1, callback2) {
                var fn = comm.exports;
                var that = this;
                var curVer = '';											//当前设备版本号
                var curDeviceType = that.getDeviceType();					//当前设备类型

                if(!versionObj[curDeviceType]) return;

                function versionContrast(v1, v2) {
                    if(!v1 || !v2) return -1;

                    var result = 0;
                    v2 = v2.split('.');
                    v1.split('.').some(function(n, i) {
                        return result = n - v2[i];
                    });
                    return result;
                };

                that.getVersion(function(curVer) {
                    if(versionContrast(curVer, versionObj[curDeviceType]) >= 0) {
                        if(!comm.isInit) {
                            that.newVersion = true;			//是否是新版本的app
                        }

                        callback1 && callback1();
                    } else {
                        callback2 && callback2();
                    }
                })
            },

            //获取当前设备版本号（为了更好的兼容性，获取版本号的方法，均为旧版本的获取版本号方法）
            //ios可直接服从ua中获取版本号，但是为了避免一些意外情况（比如ua丢失），调用ios的方法获取版本号（异步）
            //callback：为获取版本号之后的回调，回调中包含一个版本号参数
            getVersion: function(callback) {
                var that = this;
                var curDeviceType = that.getDeviceType();					//当前设备类型
                var curVer = '';											//当前设备版本号
                var iosVerReg = /AppInfo-\((.+)\)\s?/;						//ios获取版本号正则
                var androidVerReg = /com.secoo\/(.+)\s?/;					//android获取版本号正则

                if(curDeviceType == 'ios') {
                    var iosVer = ua && iosVerReg.exec(ua);
                    if(iosVer) {
                        callback && callback(iosVer[1].split('/')[2]);
                    } else {

                        //pc获取不到版本号，为了更好地在pc上调试，调用失败时按照低版本处理
                        try {
                            //沿用旧的版本号处理方式，ios不会废弃此方法
                            jsBridge.callHandler('WVJS_acqureDeviceInfomation', {}, function (response) {
                                callback && callback(response.appVersion);
                            });
                        } catch(error) {
                            console.log(error);
                            callback && callback('0.0.0');
                        }
                    }
                } else if(curDeviceType == 'android') {

                    //新旧版本的安卓，都已经把版本号信息存储在了cookie中
                    //为了防止达到cookie存储上线读不到cookie中的信息，会尝试采用安卓的新方法获取版本号
                    //如新方法也获取失败，则直接按照最低版本处理
                    var uaAppVersion = ua && androidVerReg.exec(ua) && androidVerReg.exec(ua)[1];
                    var androidAppVersion = uaAppVersion || getCookie('androidAppVersion') || getCookie('appVersion');
                    if(uaAppVersion || androidAppVersion) {
                        callback && callback(androidAppVersion);
                    } else {
                        try {
                            jsBridge.callHandler('JsCallNativeMethod', {
                                "action":"getAppInfo",
                                "needResult":true
                            }, function (response) {
                                callback && callback(response.data.appVersion);
                            });
                        } catch(error) {
                            console.log(error, '获取版本号失败，开始启用新版本');
                            //增加对调用失败的处理，按照最高版本号返回
                            callback && callback('999.999.999');
                        }
                    }
                }

                function getCookie(a) {
                    var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
                    return (b = document.cookie.match(c)) ? decodeURIComponent(b[2]) : null
                }
            },

            //app埋点统计
            statistics: function(option) {
                var that = this;
                var deviceType = that.getDeviceType();

                //将公共埋点参数合并到原埋点参数上
                option = $.extend({}, pageConfig.statisticsData || {}, option);

                //ios从6.0.16版本开始不会自动添加s.ot这个值，所以需要埋一个默认值，2代表点击
                option['s.ot'] = option['s.ot'] || '2';

                try {
                    switch (deviceType) {
                        case 'ios':
                            //调用旧方法埋点
                            jsBridge.callHandler("statsJSEventInfo", option, function() {})
                            break;
                        case 'android':
                            if(that.newVersion) {
                                //安卓的埋点方法，所传的key、value均需字符串格式
                                var logData = {}
                                $.each(option, function(i, ele) {
                                    logData[i + ''] = ele + '';
                                });

                                jsBridge.callHandler('JsCallNativeMethod', {
                                    "action": "log",
                                    "data": logData
                                });
                            }
                            break;
                        case 'wap':
                            $.post('//datacollect.secoo.com/m/dcs.gif', that.jsonToUrlParams(option))
                            break;
                    }

                    //新版app采用神策埋点
                    var obj = {};
                    $.each(option, function(key, value) {
                        var key = key.replace('.', '_');
                        obj[key] = value;
                    });
                    obj['s_title'] = that.getDom('title').innerHTML;
                    option = obj;
                    sensors.track('h5_click', option);

                    (pageConfig.showStatisticsData || that.getQueryString('showStatisticsData') == 1) && console.log('埋点数据：', option);

                } catch(error) {
                    console.log(error, '埋点失败')
                }
            },

            //获取upk
            getUpk: function(callback) {
                var that = this;
                var deviceType = that.getDeviceType();

                switch (deviceType) {
                    case 'wap':
                        callback && callback(that.cookie('Sid'))
                        break;
                    case 'ios':
                    case 'android':
                        //新版本获取方法
                        jsBridge.callHandler('JsCallNativeMethod', {
                            "action": "getUserInfo",
                            "needResult": true
                        }, function(result) {
                            callback && callback(result.data.sid)
                        });
                        break;
                    case 'miniProgram':
                    case 'douyinProgram':
                    case 'zhifubaoProgram':
                    case 'baiduProgram':
                        callback && callback(app.getQueryString('_wxupk') || '');
                        break;
                }
            },

            //登录方法
            login: function(callback, redirectUrl) {
                var deviceType = this.getDeviceType();

                //小程序内h5页面登录链接
                var programRedirectUrl = {
                    url: '/pages/account/loginAccount/loginAccount?_wxurl='+ encodeURIComponent(redirectUrl || href.replace(/\&_wxupk[\s\S]*/, ''))
                }

                switch (deviceType) {
                    case 'wap':
                        top.location.href = 'https://m.secoo.com/v1/login/?redirect_uri=' + encodeURIComponent(redirectUrl || href);
                        break;
                    case 'ios':
                    case 'android':
                        //注册一个回调方法
                        jsBridge.registerHandler('onLoginedIn', function(result) {
                            callback && callback(result);
                        });

                        //调用登录方法成功后，会调用回调方法
                        jsBridge.callHandler('JsCallNativeMethod', {
                            "action":"navigate",
                            "data":{
                                "path":"app/login_page",
                                "jsHandle": "onLoginedIn"
                            }
                        });
                        break;
                    case 'miniProgram':
                        wx.miniProgram.navigateTo(programRedirectUrl);
                        break;
                    case 'baiduProgram':
                        swan.webView.navigateTo(programRedirectUrl)
                        break;
                    case 'douyinProgram':
                        tt.miniProgram.navigateTo(programRedirectUrl);
                        break
                }
            },

            /*	吊起微信小程序，或小程序相关页面
             *	wap端和小程序页面跳转
             *	@miniProgramId 	小程序id	普通专题跳转
             *	@path 			要吊起的小程序路径，可在路径后传参，不填则默认拉起小程序
             *	@callback 		尝试吊起小程序的回调，参数中函数吊起成功与否的状态
             *	@result 		errorCode 0为成功，非0为失败
             *	注：				使用此方法ios版本需大于6.0.22，安卓版本需大于等于6.1.13
             */
            launchWXMiniProgram: function(miniProgramId, path, callback) {
                jsBridge.callHandler('JsCallNativeMethod', {
                    "action": "launchWXMiniProgram",
                    "needResult": true,
                    "data": {
                        "miniProgramId": miniProgramId,
                        "path": path
                    }
                }, function(result) {
                    callback && callback(result.data.errorCode)
                });
            },
            /*==================与native交互方法================*/
            /*=======================end=======================*/

            /*===================处理不同端跳转=================*/
            /*======================start======================*/
            /*	wap端和小程序页面跳转
             *	@params type = page			普通专题跳转
             *	@params type = product		跳转单品
             *	@params type = keyword		搜索关键字筛选
             *	@params type = brand		品牌筛选
             *	@params type = auction		拍卖商品
             *	@params type = url			第三方链接跳转
             */
            //wap跳转
            wapGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url || '';
                var params = option.params;
                var addFromId = option.addFromId;
                var pageid = option.pageid? option.pageid: url;
                var pageUrl = '';
                switch (type) {
                    case 'page':
                        pageUrl = '//m.secoo.com/appActivity/' + url + '.shtml?pageid=' + pageid + (params? '&' + params: '');
                        break;
                    case 'product':
                        pageUrl = '//m.secoo.com/proDetail_1217.html?prodId=' + url + (addFromId? "&addFrom=" + addFromId: '');
                        break;
                    case 'keyword':
                        pageUrl = "//m.secoo.com/v1/list?keyword=" + encodeURIComponent(url) + (params && ('&opt_params=' + that.urlParamsToJson(params, true)) || '');
                        break;
                    case 'brand':
                        pageUrl = "//m.secoo.com/v1/list?type=brand&keyword=" + encodeURIComponent(url) + '&' + params;
                        break;
                    case 'category':
                        pageUrl = "//m.secoo.com/v1/list?type=category&keyword=" + encodeURIComponent(url) + '&' + params;
                        break;
                    case 'ticket':
                        pageUrl = "//m.secoo.com/v1/list?type=ticket&ticketId=" + encodeURIComponent(url);
                        break;
                    case 'url':
                        pageUrl = url + (addFromId? (url.indexOf('?') > -1? '&addFrom=': '?addFrom=') + addFromId: '') + (params? '&' + params: '');
                        break;
                }

                /*	金融部与银行合作，通过url中的唯一标识kzpSourceCode是否存在，来确定在m站收银台时，存在该值时直接吊起信用卡支付
                 *	当前做法为，在入口页将kzpSourceCode埋在sessionStorage中，因为入口页面为三期模板，域名为las.secoo.com，
                 *	而主站域名为m.secoo.com，sessionStorage存在跨域问题，所以先跳转m.secoo.com域名的中转页，埋好sessionStorage，
                 *	然后再跳转到目标页面
                 */
                var kzpSourceCode = app.getQueryString('kzpSourceCode');
                var redirectUrl = '//m.secoo.com/appActivity/transformBank0309.shtml?kzpSourceCode=' + kzpSourceCode + '&backUrl=' + encodeURIComponent(pageUrl)
                top.location.href = kzpSourceCode? redirectUrl: pageUrl;
            },

            //安卓跳转 支持新版本
            androidGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url;
                var title = option.title;
                var params = option.params;
                var addFromId = option.addFromId;
                switch (type) {
                    case 'page':
                    case 'product':
                    case 'keyword':
                    case 'brand':
                    case 'ticket':
                    case 'url':
                    case 'native':
                        that.nativeGoPage(option)
                        break;
                    case 'auction':
                        break;
                }
            },

            //ios跳转 支持新版本
            iosGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url;
                var title = option.title;
                var params = option.params;
                var addFromId = option.addFromId;
                var activityId = option.activityId;
                switch (type) {
                    case 'page':
                    case 'product':
                    case 'keyword':
                    case 'brand':
                    case 'ticket':
                    case 'url':
                    case 'native':
                        that.nativeGoPage(option)
                        break;
                    case 'auction':
                        break;
                }
            },

            //native页面跳转主方法
            nativeGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url;
                var title = option.title;
                var params = option.params;
                var addFromId = option.addFromId;
                var showShareButton = !!option.showShareButton;
                var hostName = pageConfig.hostName || (that.getDeviceType() == 'ios'? 'iphone': 'android');
                var pageid = option.pageid? option.pageid: url;
                var pageData = {};
                var nativeShare = showShareButton? '&share=nativeShare': ''

                //处理搜索参数
                function handelUrlParams(params) {
                    var params = params? params.split("&"): [];
                    var filters = [];
                    for (var i = 0; i < params.length; i++) {
                        var tempParams = params[i].split("=");
                        var tempFilters = {};
                        tempFilters.key = tempParams[0];
                        tempFilters.value = "price" == tempParams[0]? [tempParams[1]]: tempParams[1].split("_"),
                            filters.push(tempFilters)
                    }
                    return filters;
                }

                switch (type) {
                    case 'page':
                        pageData = {
                            "path":"app/webpage",
                            "url": protocol + '//' + hostName +'.secoo.com/appActivity/' + url + '.shtml?pageid=' + pageid + (params? '&' + params: '') + nativeShare,
                            "navFrom": addFromId,
                            "showShareButton": showShareButton
                        }
                        break;
                    case 'product':
                        pageData = {
                            "path": "goods/detail_item",
                            "id": url + '',
                            "addFrom": addFromId,
                            "navFrom": addFromId
                        }
                        break;
                    case 'keyword':
                    case 'brand':
                    case 'ticket':
                    case 'category':
                        pageData = {
                            "path":"app/search",
                            "text": url,
                            "type": type,
                            "title": title,
                            'filters': handelUrlParams(params),
                            'trackLabelId': option.trackLabelId
                        }
                        break;
                    case 'auction':

                        break;
                    case 'url':
                        pageData = {
                            "path":"app/webpage",
                            "url": url + (addFromId? (url.indexOf('?') > -1? '&addFrom=': '?addFrom=') + addFromId: '') + (params? '&' + params: '') + nativeShare,
                            "navFrom": addFromId,
                            "showShareButton": showShareButton
                        }
                        break;
                    case 'native':
                        pageData["path"] = url;
                        break;
                }
                jsBridge.callHandler('JsCallNativeMethod', {
                    "action":"navigate",
                    "data": pageData
                });
            },

            //微信小程序跳转
            weixinGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url || '';
                var params = option.params || '';
                var addFromId = option.addFromId;
                var pageid = '&pageid=' + (option.pageid? option.pageid: url);
                var pageUrl = '';
                var option = that.handleProgramUrl(option);		//小程序中单独处理url参数

                switch (type) {
                    case 'page':
                    case 'url':
                        that.wapGoPage(option);
                        return;
                        break;
                    case 'miniPage':
                    case 'native':
                        pageUrl = url + (params && (url.indexOf('?') > -1? '&': '?') + params);
                        break;
                    case 'product':
                        pageUrl = "/pages/product/detail/productDetail?productId=" + url + (addFromId? "&addFrom=" + addFromId: '') + pageid
                        break;
                    case 'ticket':
                        pageUrl = "/pages/product/list/productList?searchType=4&title=优惠券专区&ticketId=" + url;
                        break;
                    case 'keyword':
                        pageUrl = "/pages/product/list/productList?searchType=0&keyword=" + url + '&' + params + pageid;
                        break;
                    case 'brand':
                        pageUrl = "/pages/product/list/productList?searchType=1&brandId=" + url + pageid;
                        break;
                }
                wx.miniProgram.navigateTo({url: pageUrl});
            },

            //抖音小程序跳转
            douyinGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url || '';
                var params = option.params || '';
                var addFromId = option.addFromId;
                var pageid = '&pageid=' + (option.pageid? option.pageid: url);
                var pageUrl = '';
                var option = that.handleProgramUrl(option);		//小程序中单独处理url参数

                switch (type) {
                    case 'page':
                    case 'url':
                        that.wapGoPage(option);
                        return;
                        break;
                    case 'miniPage':
                    case 'native':
                        pageUrl = url + (params && (url.indexOf('?') > -1? '&': '?') + params);
                        break;
                    case 'product':
                        pageUrl = "/pages/product/detail/productDetail?productId=" + url + (addFromId? "&addFrom=" + addFromId: '') + pageid
                        break;
                    case 'ticket':
                        pageUrl = "/pages/product/list/productList?searchType=4&title=优惠券专区&ticketId=" + url;
                        break;
                    case 'keyword':
                        pageUrl = "/pages/product/list/productList?searchType=0&keyword=" + url + '&' + params + pageid;
                        break;
                    case 'brand':
                        pageUrl = "/pages/product/list/productList?searchType=1&brandId=" + url + pageid;
                        break;
                }
                tt.miniProgram.navigateTo({url: pageUrl});
            },

            //百度小程序跳转
            baiduGoPage: function(option) {
                var that = this;
                var type = option.type;
                var url = option.url;
                var params = option.params;
                var addFromId = option.addFromId;
                var pageid = '&pageid=' + (option.pageid? option.pageid: url);
                var pageUrl = '';
                var option = that.handleProgramUrl(option);		//小程序中单独处理url参数
                switch (type) {
                    case 'page':
                    case 'url':
                        that.wapGoPage(option);
                        return;
                        break;
                    case 'miniPage':
                    case 'native':
                        pageUrl = url + (params && (url.indexOf('?') > -1? '&': '?') + params);
                        break;
                    case 'product':
                        pageUrl = "/pages/product/detail/productDetail?productId=" + url + (addFromId? "&addFrom=" + addFromId: '') + pageid;
                        break;
                    case 'ticket':
                        pageUrl = "/pages/product/list/productList?searchType=4&title=优惠券专区&ticketId=" + url;
                        break;
                    case 'keyword':
                        pageUrl = "/pages/product/list/productList?searchType=0&keyword=" + url + pageid;
                        break;
                    case 'brand':
                        pageUrl = "/pages/product/list/productList?searchType=1&brandId=" + url + pageid;
                        break;
                }
                swan.webView.navigateTo({url: pageUrl});
            },

            //支付宝小程序跳转
            zhifubaoGoPage: function(option) {

            },

            //小程序中h5页面跳转
            handleProgramUrl: function(option) {
                var that = this;

                //小程序的跳转 都会带上upk参数，方便其他页面直接获取登录状态
                var upk = app.getQueryString('_wxupk');
                var miniParams = '&' + programTypes[that.getDeviceType()];	//url中小程序的唯一标识
                option['params'] = option['params']? (option['params'] + '&'): '';
                option['params'] += '_wxupk=' + upk + miniParams;
                return option;
            },

            //区分m站、ios、android、小程序的跳转
            goPage: function(option) {
                var that = this;
                var deviceType = that.getDeviceType();

                // console.log(option)

                switch (deviceType) {
                    case 'wap':
                        that.wapGoPage(option);
                        break;
                    case 'ios':
                        that.iosGoPage(option);
                        break;
                    case 'android':
                        that.androidGoPage(option);
                        break;
                    case 'miniProgram':
                        that.weixinGoPage(option);
                        break;
                    case 'baiduProgram':
                        that.baiduGoPage(option);
                        break;
                    case 'douyinProgram':
                        that.douyinGoPage(option);
                        break;
                    case 'zhifubaoProgram':
                        that.zhifubaoGoPage(option);
                        break;
                }
            },

            /*	处理事件参数（埋点参数、跳转参数）
             *	@params: target，zepto/jquery对象，必传
             *	@params: event，事件对象，可不传
             *	@params: isExposure，布尔值，默认false，区分是否来自于曝光方法的调用，曝光的调用，s.ot的值会设置成4
             *	@return: 返回处理好的json格式对象，包含跳转参数、埋点参数
             */
            handleEventData: function(target, event, isExposure) {

                //不存在eventdata参数直接退出
                var eventDataOrigin = target.attr('eventdata');
                if(!eventDataOrigin) return;

                var that = this;
                var dataCollection = $('#dataCollection');
                var defaultData = dataCollection.length == 1 && JSON.parse(dataCollection.attr('data-statistics'));	//兼容旧埋点方案
                var customData = target.attr('data-statistics') && JSON.parse(target.attr('data-statistics')) || {};//自定义埋点
                var eventDate = JSON.parse(eventDataOrigin);
                var type = eventDate.type;
                var url = eventDate.pcDate || eventDate.productCode || eventDate.url;
                var uuid = eventDate.uuid || that.uuid && (that.uuid.indexOf('${sectionid?c}') > -1? '': that.uuid);
                var hash = win.location.hash;
                var addFromId = target.attr('addFrom') || (uuid && hash? hash.split("#")[1] + '_' + uuid: uuid);
                var types = {
                    '0': 'page',
                    '3': 'product',
                    '4': 'auction',
                    '6': 'keyword',
                    '7': 'brand',
                    '100': 'url',
                }
                var curType = types[type];
                var type = curType || type;
                var noShareBtn = url? (url + '').indexOf('noShareBtn') > 0: false;	//是否展示分享按钮
                var labelReg = /activitylabel\d+\=(\d+)/i;							//标签搜索正则
                var labelRegContent = labelReg.exec(eventDate.query || eventDate.params);
                var labelContent = (labelRegContent && labelRegContent[1])? 'label_' + labelRegContent[1]: '';
                var touchPosition = event && event._args && event._args.touchPosition || {};
                var pageid = that.getQueryString('pageid');
                var params = eventDate.query || eventDate.params

                //为了追踪某个模块的转化，需要在跳转是添加来源参数，并把当前页面参数带到下一页，拼接规则为：
                //spm=来源页面pageid,来源页面模板ID,来源页面位置(0,1,2,3....);当前页面ID,当前页面模板ID,当前页面位置
                //例子1：					||		例子2：
                //A跳到B 					||		A跳到B
                //B跳到商品					||		B跳到C
                //							||		C跳到商品
                //spm=A,AID,1;B,BID,2		||		spm=B,BID,2;C,CID,3
                var spm = that.getQueryString('spm');
                var curSpm = '';
                var prevSpm = ',,;';
                if(spm) {
                    prevSpm = spm.indexOf(';') < 0? spm: (spm.split(';')[1] + ';');
                }
                curSpm = prevSpm + pageid + ',' + (customData['s.acid']? customData['s.acid']: '') + ',' + (eventDate.index || target.index());
                addFromId = addFromId + '_spm=' + curSpm;
                params = (params? (params + '&'): '') + 'spm=' + curSpm;

                // console.log('curSpm ---', curSpm)
                // console.log('addFromId ---', addFromId)
                // console.log('params ---', params)

                var data = {
                    //埋点所需数据
                    statisticsData: {
                        's.x': touchPosition.x1 || '',
                        's.y': touchPosition.y1 || '',
                        's.paid': eventDate.paid || pageid || app.pageid,
                        's.opid': eventDate.opid || url && encodeURIComponent(url) || labelContent,	//拍卖商品opid为1053
                        's.od': eventDate.od || type,
                        's.os': eventDate.os,
                        's.id': eventDate.id,
                        's.sid': eventDate.sid,
                        's.row': eventDate.floorname || eventDate.floor,		//兼容旧版埋点
                        's.co': eventDate.index,
                        's.ot': isExposure? '4': eventDate.ot || '2',			//1为pv，2为点击，4为曝光
                        's.kwd': labelContent,
                        's.sr': windowWidth + 'x' + windowHeight				//屏幕尺寸
                    },
                    //页面跳转所需数据
                    goPageData: {
                        type: curType || type,									//跳转类型
                        url: url || '',											//跳转链接
                        addFromId: addFromId,									//加购追踪来源
                        params: params,											//链接参数
                        title: eventDate.title || '',							//标题
                        showShareButton: noShareBtn? false: eventDate.share != 0,		//是否展示分享按钮，不传值默认为展示
                        pageid: eventDate.pageid,								//页面id
                        activityId: eventDate.activityId || '',					//拍卖商品的活动id
                        trackLabelId: labelContent,								//跳转标签搜索时native埋点所需的id
                    }
                }

                //增加全局埋点统计与自定义埋点统计，方便统一处理埋点，兼容旧的埋点方案
                $.extend(defaultData || {}, pageConfig.statisticsData || {});
                data.statisticsData = $.extend(defaultData, data.statisticsData, customData);

                //删除空对象(且值不为数字0，因为可能刻意传数字0的值)，以及去除首尾空格
                $.each(data, function(i, ele) {
                    $.each(ele, function(j, node) {
                        data[i][j] = (data[i][j] + '').trim();
                        if(!node && node !== 0) delete data[i][j];
                    });
                });

                //跳转时是否在控制台显示跳转数据
                !!pageConfig.showGoPageLog && console.log('页面跳转数据：', data);
                return data;
            },

            //执行跳转主体方法
            goPageAction: function(target, event) {

                //是否禁止事件冒泡，个别情况需防止事件继续传递
                if(target.attr('stopPropagation')) event.stopPropagation();

                var that = this;
                var option = that.handleEventData(target, event);

                if(!option) return;

                var goPageData = option.goPageData;

                //app数据埋点，经过try catch处理，埋点失败也不会影响跳转
                that.statistics(option.statisticsData);

                //添加神策热力图埋点
                try {
                    window.sensors && sensors.quick('trackHeatMap', target.get(0));
                } catch (error) {
                    console.log(error)
                }

                //防止短时间内快速点击打开多个页面，目前禁止了为1秒内的多次点击
                var goPageTime = null;
                clearTimeout(goPageTime);

                //执行跳转
                if(!pageConfig.showGoPageLog && comm.canGoPage && !target.hasClass('noEvent') && !target.hasClass('noActivityLink') && (goPageData.type && goPageData.url) || goPageData.type == 'keyword') {
                    comm.canGoPage = false;
                    goPageTime = setTimeout(function() {
                        comm.canGoPage = true;
                    }, 1000);
                    that.goPage(option.goPageData)
                }
            },

            //执行事件绑定方法
            bindEvent: function() {
                var that = this;

                //普通绑定
                $('.bindEvent, .activityHandle').on('tap', function(event) {
                    that.goPageAction($(this), event);
                });

                //列表模式绑定
                $('.bindEventList, .activityHandles, .producodeUlList').on('tap', 'li', function(event) {
                    that.goPageAction($(this), event);
                });

                //事件委托绑定
                $('.eventParent').on('tap', '.eventChild', function(event) {
                    that.goPageAction($(this), event);
                });

                //事件委托绑定
                $('._eventBind').on('tap', '.activityBind', function(event) {
                    that.goPageAction($(this), event);
                });

                //事件委托绑定，用于吊起native的分享控件
                $('.eventParent').on('tap', '.nativeShareBtn', function(event) {
                    win.nativeShare && win.nativeShare();
                });
            },
            /*===================处理不同端跳转=================*/
            /*========================end======================*/


            /*======================UI层方法===================*/
            /*=======================end=======================*/
            //toast提示
            toast: function(str) {
                var that = this;
                //toast初始化(不在寺库app内生效，toast调用native方法)
                if(that.deviceType.inApp && str) {
                    //新版本app调用新方法
                    jsBridge.callHandler('JsCallNativeMethod', {
                        "action":"updateUI",
                        "data":{
                            "viewId": "toast",
                            "text": str,
                            "duration": 0
                        }
                    });
                } else {
                    //m站toast提示
                    var toast = $('.toast span');
                    if(toast.length == 0) {
                        $('body').append(comm.template.toastTpl);
                        $('.toast span').on("webkitAnimationEnd", function() {
                            $(this).removeClass('toast-enter-active');
                        });
                    } else if(str) {
                        toast.text(str).addClass('toast-enter-active');
                    }
                };
            },

            //顶部标题栏
            headBarInit: function(option) {

                //如果页面配置选项中配置了不初始化头部，或不是m站，则直接退出
                if(option.initHead === false || this.getDeviceType() !== 'wap' || window !== top || this.getQueryString('noWapHeader') == '1') return;

                var html = $('html');
                var body = $('body');
                var defaultOption = comm.templateData.headBarData;
                var headTpl = comm.template.headBarTpl;
                var option = defaultOption.concat(option.headerConfig || []);	//合并头部配置
                var innerHtml = '';

                //添加head标签
                body.prepend(headTpl);

                for(var i = 0; i <= option.length - 1; i++) {
                    var attrs = option[i];
                    innerHtml += "<li eventdata='{" + '"type":"' + attrs.urlType + '","url":"' + attrs.url + '"' + "}'><span class='" + attrs.className + "'></span>" + "<span>" + attrs.innerHtml + "</span></li>"
                }

                var header = body.find('#header');

                //设置标题
                var title = html.find('title').html() || 'SECOO';
                header.find('.title').html(title);

                //设置右上角按钮list内容
                var headUl = header.find('ul')
                headUl.html(innerHtml);

                //添加左右按钮点击事件
                var header_back = header.find('.header_icon_back');
                var header_menu = header.find('.header_icon_menu');
                header_back.on('tap', function() {
                    win.history.go(-1);
                });
                header_menu.on('tap', function() {
                    headUl.toggleClass('show');
                });
            },
            /*======================UI层方法===================*/
            /*========================end======================*/


            /*====================基础公共方法==================*/
            /*=======================start=====================*/
            //扩展设备类型 按照之前的方式获取，增加了小程序类型
            getDeviceType: function() {
                var allDeviceType = this.deviceType;
                var androidApp = allDeviceType.androidApp;
                var iosApp = allDeviceType.iosApp;
                var miniProgram = allDeviceType.miniProgram;
                var baiduProgram = allDeviceType.baiduProgram;
                var douyinProgram = allDeviceType.douyinProgram;
                var zhifubaoProgram = allDeviceType.zhifubaoProgram;
                if(!comm.isInit) {
                    //只有页面初始化时执行一次
                    allDeviceType['inApp'] = androidApp || iosApp;
                    allDeviceType['wap'] = !(androidApp || iosApp || miniProgram || baiduProgram || douyinProgram || zhifubaoProgram);
                }

                return androidApp? 'android':
                    iosApp? 'ios':
                        miniProgram? 'miniProgram':
                            baiduProgram? 'baiduProgram':
                                douyinProgram? 'douyinProgram':
                                    zhifubaoProgram? 'zhifubaoProgram':
                                        'wap';
            },

            /*	将一个对象转换成url参数字符串
             *	obj：要转换的json对象
             *	encode：是否对转化完成的参数进行编码，默认不编码
             */
            jsonToUrlParams: function(obj, encode){
                var res = '';
                for(var attr in obj){
                    var val = obj[attr] == 0? obj[attr]: obj[attr] || '';
                    if(val){
                        val = encode? encodeURIComponent(val): val;
                    }
                    res += (attr + '=' + val + '&');
                }
                return res.replace(/&$/, '');
            },

            /*	将一个url参数字符串转换成对象
             *	urlParams：要转换的url参数
             *	encode：是否对转化完成的json进行编码，默认不编码
             */
            urlParamsToJson: function(urlParams, encode){
                var res = {};
                var paramsArr = urlParams.split('&');
                for(var i = 0; i < paramsArr.length; i++){
                    var curParams = paramsArr[i].split('=');
                    curParams[1] && (res[curParams[0]] = curParams[1]);
                }
                res = JSON.stringify(res);
                return encode? encodeURIComponent(res): res;
            },

            /*	加载js
             *	@params urls		可传数组、字符串，数组和字符串默认全端加载
             *	@params callback1 	全部js加载完后执行的方法，必传
             *	@params async		是否开启异步加载
             *	@params callback2 	zepto加载完后执行的方法，可不传
             */
            loadJs: function(urls, callback1, async, callback2) {

                var zeptoIsLoad = false;
                var that = this;
                async = async || false;

                if(comm.tools.typeof(urls) == 'string') {
                    var temp = urls;
                    urls = [];
                    urls.push(temp);
                }

                var loadNum = 0;							//已加载js数
                var maxLength = urls.length;				//js最大资源数

                if(async == 'async') {
                    for(var i = 0; i <= urls.length - 1; i++) {
                        that.creatDom({
                            dom: 'script',
                            url: urls[i],
                            async: 'async',
                            callback: callback1
                        })
                    }
                } else {
                    function load(i) {
                        if(maxLength === i) return;

                        that.creatDom({
                            dom: 'script',
                            url: urls[i],
                            callback: function() {
                                load(++i);
                                if(!zeptoIsLoad && win.$) {
                                    zeptoIsLoad = true;
                                    callback2 && callback2();
                                }
                                if(maxLength === i) {
                                    callback1 && callback1();
                                    return;
                                }
                            }
                        });
                    }
                    load(loadNum);
                }
            },

            //获取页面id
            getPageId: function(url) {
                var url = url || href;
                var matchPageId = url.match(/[^\/\.\?\#]+(?=\.(html|shtml))/);
                var pageid = this.getQueryString('pageid', url) || matchPageId && matchPageId[0];
                if(!comm.isInit) {
                    app.pageid = pageid;
                }
                return pageid;
            },

            //模板引擎
            tpl: function(id, data, arg){
                var html = id.innerHTML || document.getElementById(id).innerHTML;
                var result = "var p = ''; p += '" +
                    html.replace(/[\r\n\t]/g, " ")
                        .replace(/<%=(.*?)%>/g, "'; p += $1; p += '")
                        .replace(/<%/g, "';")
                        .replace(/%>/g, "p += '")
                    + "'; return p;";
                return data? Function('data', 'arg', result)(data, arg): Function('data', 'arg', result);
            },

            /*	cookie操作
             *	(1)获取cookie：	只传一个参数的name
             *	(2)设置cookie：	传两个及以上参数且第三个参数不为负数，(name和value必传)
             *	(3)删除cookie：	必传name，第二个参数传null，cookie('name', null)
             *	@params name 	cookie名
             *	@params value 	cookie值
             *	@params expires 过期时间，单位：天，非必传
             *	@params domain 	指定可访问的域名，非必传
             *	@params path 	指定存储的路径，非必传，默认为'/'，非必传
             *	@params encode 	是否对值进行encodeURIComponent，非必传
             *	@params secure 	是否安全传输 当协议为https时才可用，非必传
             */
            cookie: function(name, value, expires, domain, path, encode, secure) {
                var that = this;
                var len = arguments.length;
                if(len == 1) {
                    var cookieVal = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                    return cookieVal? decodeURIComponent(cookieVal[2]): null;;
                }
                var ck = [];
                ck.push(name + '=');

                //是否encodeURIComponent
                value && ck.push(!!encode ? value : encodeURIComponent(value));

                //是否为删除cookie
                value === null && that.cookie(name, '', -1);

                if (expires) {
                    var time = new Date();
                    time.setHours(0);
                    time.setMinutes(0);
                    time.setSeconds(0);
                    time.setTime(time.getTime() + expires * 86400000);		//24 * 60 * 60 * 1000
                    ck.push(';expires=' + time.toGMTString());
                }
                if (domain) {
                    ck.push(';domain=' + domain);
                }
                ck.push(';path=' + (path || '/'));
                if (secure) {
                    ck.push(';secure');
                }
                document.cookie = ck.join('');
            },

            //获取url参数，可指定url链接，如不传url则默认获取当前页面链接中的参数
            getQueryString: function(name, url) {
                url = url || href;
                var str = url.match(new RegExp('([?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
                return str? decodeURIComponent(str[0].split('=')[1]): '';
            },

            /*	货币格式化（把数字格式化成货币型）
             * 	@param num		被格式化的数字【必选】
             * 	@param decimal 	小数位  默认两位【可选】
             * 	@param round  	如何舍入 可选值为1，0，-1
             * 					分别表示：只入不舍ceil,四舍五入round，只舍不入floor,四舍六入五留双【可选】
             * 	@return 		货币格式的字符串型的数字
             * 	@example 		priceFormat(1234567.456,2,0)=>1,234,567.46
             */
            priceFormat: function(num, decimal, round) {
                var arr;
                if (!comm.tools.typeof(decimal, 'undefined')) {
                    num = this.numberFormat(num, decimal, round);
                }
                arr = (num + '').split('.');
                arr[0] = arr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                return (arr[0] + (arr.length == 2 ? '.' + arr[1] : '')).replace(/^\./g, '0.');
            },

            /* 格式化数字,小数位不足被0
             * @param num 		被格式化的数字【必选】
             * @param decimal  	小数位【可选】
             * @param round 	如何舍入 可选值为1，0，-1 ,465分别表示：只入不舍ceil,四舍五入round，只舍不入floor,四舍六入五留双【可选】
             * @return 			被格式化后的字符串型的数字
             * @example 		SEC.number.format(123.456,2,0);
             */
            numberFormat: function(num, decimal, round) {
                var pow;
                decimal = !comm.tools.typeof(decimal, 'number') || isNaN(decimal * 1) ? 2 : Math.abs(decimal);
                pow = Math.pow(10, decimal);
                num *= 1;
                //f_num处理浮点数问题，能保证保留10位小数以内计算得到正常结果
                var f_num = 0.000000000099999;
                switch (round) {
                    case 1:
                        num = Math.ceil(num * pow) / pow;
                        break;
                    case -1:
                        num = Math.floor(num * pow + f_num) / pow;
                        break;
                    case 465:
                        //四舍六入五成双,如保留两位小数，第三位小数如果是5，则看第二位是奇偶，如果是奇，则进位，否则舍去
                        var is_jo = Math.floor(num * pow + f_num) % 10 % 2;
                        //要进位上数字是否是5
                        var is_five = Math.floor(num * pow * 10 + f_num) % 10 == 5;
                        var step = is_five && !is_jo ? 1 / pow : 0;
                        num = SEC.number.format(num, decimal) - step;
                        break;
                    default:
                        num = (num * pow + f_num) / pow;
                }
                return (num.toFixed(decimal) + '').replace(/^\./g, '0.').replace(/\.$/, '');
            },

            //获取服务器时间
            getSeverTime: function(callback) {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//las.secoo.com/api/rush_rob/current_time",
                    success: function(data) {
                        callback && callback(data.currentTime)
                    }
                })
            },

            //设置调码价格，此方法为无法修改erp模板的无奈之举
            setProductPrice: function() {
                var that = this;
                function t(e) {
                    $.ajax({
                        type: "get",
                        dataType: "jsonp",
                        url: "//lr.secooimg.com/products?is_multi_spec=1",
                        data: "productIds=" + e.join(","),
                        success: function(e) {
                            for (var t = !1, i = 0, s = e.length; s > i; i++) {
                                var o = $(".producodeUlList li[productcode='" + e[i].pidStr + "']")
                                    , a = e[i].secooPrice
                                    , c = e[i].phActName
                                    , n = e[i].phActPrice
                                    , r = e[i].originalSecooPrice;
                                t || c && (t = !0),
                                "activityExclusivePrice"in e[i] && Boolean(e[i].activityExclusivePrice) && (a = e[i].activityExclusivePrice),
                                    c ? r ? (o.find(".cp_siku").addClass("line").html("&yen;" + r),
                                        o.find(".activityPrice").html(c + ": &yen;" + n)) : (o.find(".cp_siku").html("&yen;" + a),
                                        o.find(".activityPrice").html(c + ": &yen;" + n)) : o.find(".cp_siku").html("&yen;" + a),
                                e[i].totalSize || o.find(".shouqing_span").show()
                            }
                            $(".activtyApp_c .cp_buy").css("visibility", "visible");
                            // t && $(".activtyApp_c .activityDiv").show()
                        },
                        error: function(e) {
                            console.log(e)
                        },
                        complete: function() {
                            o.length && setTimeout(function() {
                                t(o.splice(0, 50))
                            }, 1500)
                        }
                    })
                }
                var i = $("input.productList");
                if (i.length) {
                    var s = "";
                    i.each(function() {
                        s += $(this).val()
                    }),
                        s = s.substr(0, s.length - 1);
                    var o = s.split(",");
                    t(o.splice(0, 50))
                }
            },

            //图片懒加载
            lazyLoadImg: function() {
                $.fn.picLazyLoad = function(settings) {
                    var that = $(this);
                    var win = $(window);
                    var deleteWebp = /_\!\!\d*x\d*(_\d*)?\.webp$/ig;					//匹配不兼容的webp图片
                    var checkImg = /\.(gif|bmp|webp)$/i;								//是否为gif、bmp、webp图
                    var isWebp = /\.webp$/i;											//为webp图片
                    var isSecooimg = /secooimg.com/i;									//已支持webp的图片域名
                    var urlId = app.getQueryString('id');								//三期模板id
                    //var supportId = urlId? urlId.substr(urlId.length - 1) % 2 == 1: true;	//对三期模板id最后一位为1的页面支持webp，防止流量过大，测试服务器压力
                    var supportId = true;	//对三期模板id最后一位为1的页面支持webp，防止流量过大，测试服务器压力
                    var urlLoadWebp = app.getQueryString('noWebp') != 1;

                    var loadImgAction = {
                        //基础配置
                        settings: $.extend({
                            winHeight: win.height(),									//页面高度
                            loadTime: null,												//定时器
                            failList: [],												//图片请求失败列表
                            offsetArr: [],												//图片距顶部距离数组
                            advanceHeight: 200,											//图片预加载高度
                            showTime: '0.2s',											//图片显示动画时间
                            target: win,												//滚动的对象
                            placeholder: '//mpic.secooimg.com/zhuanti_pic/back.png',	//默认占位图
                            frequency: 20,												//滚动触发时间间隔
                            loadWebp: true,												//是否加载webp图片
                        }, settings || {}),

                        //初始化
                        init: function() {
                            var that2 = this;
                            var settings = that2.settings;
                            var fn = that2.fn;

                            //设置图片默认占位图
                            that.each(function(i, ele) {
                                fn.setImgSrc($(ele), settings.placeholder, true);
                            });

                            //兼容安卓提前加载webview，高度为0的问题
                            if(settings.winHeight == 0) {
                                win.on('resize', function() {
                                    settings.winHeight = $(window).height();

                                    fn.imgAction();

                                    that2.scrollAction();
                                })
                                return;
                            }

                            //先执行一次懒加载
                            fn.imgAction();

                            that2.scrollAction();
                        },

                        //滚动触发加载
                        scrollAction: function() {
                            var that2 = this;
                            var settings = that2.settings;
                            var fn = that2.fn;

                            settings.target.on('scroll', function() {
                                clearTimeout(settings.loadTime);
                                settings.loadTime = setTimeout(function() {
                                    fn.imgAction();
                                }, settings.frequency);
                            });
                        },

                        //方法集合
                        fn: {
                            //图片懒加载主方法
                            imgAction: function() {
                                var that2 = this;
                                var settings = loadImgAction.settings;
                                var protocol = location.protocol == 'https:';

                                that.each(function(i, ele) {
                                    var ele = $(ele);
                                    var top = ele.offset().top;
                                    if((top || top == 0) && that2.inViewport(ele)) {
                                        var src = ele.attr('data-original');
                                        if(!src) return;

                                        //设置加载webp为true、当前设备支持webp、符合加载的三期模板id值、图片格式不是gif、并且图片是存储在secooimg.com域名下的，才加载wewbp
                                        if(urlLoadWebp && settings.loadWebp && supportWebp && supportId && !checkImg.test(src) && isSecooimg.test(src)) {
                                            src += '_!!0x0.webp';
                                        } else if (!supportWebp && isWebp.test(src)) {
                                            var tempStr = (deleteWebp.exec(src) || [])[0]
                                            tempStr && (src = src.replace(tempStr, ''));
                                        }

                                        protocol && src.indexOf('http:') == 0 && (src = src.replace('http:', 'https:'))
                                        that2.loading(src, function() {
                                            that2.setImgSrc(ele, src);
                                        });
                                    }
                                });
                            },

                            //判断是否在当前窗口内
                            inViewport: function(ele) {
                                var settings = loadImgAction.settings;
                                var target = settings.target;
                                var targetTop = target.selector == ''? 0: target.offset().top;
                                var targetScrollTop = target.scrollTop();
                                var targetBottom = targetScrollTop + target.height();
                                var top = ele.offset().top;
                                top = target.selector == ''? top: top + targetScrollTop - targetTop;
                                var bottom = top + ele.height();

                                return top >= targetScrollTop && top <= targetBottom + settings.advanceHeight || bottom >= targetScrollTop && bottom <= targetBottom;
                            },

                            //加载图片，加载失败的图片会放入数组重新加载
                            loading: function(url, callback) {
                                var that2 = this;
                                var image = new Image();

                                if(!url) return;

                                image.onload = function () {
                                    delete image;
                                    callback && callback();
                                };
                                image.onerror = function () {
                                    loadImgAction.settings.failList.push(url);
                                    that2.loadFail();
                                    delete image;
                                };
                                image.src = url;
                            },

                            //设置图片地址
                            setImgSrc: function(ele, url, setDefultImg) {
                                var that2 = this;

                                if(setDefultImg) {
                                    //加载占位图
                                    if(ele.is('img')) {
                                        if(!ele.attr('src')) {
                                            ele.attr('src', url)
                                        }
                                    } else {
                                        if (ele.css('background-image') == 'none') {
                                            ele.css('background-image', 'url(' + url + ')');
                                        }
                                    }
                                } else {
                                    if(!ele.attr('data-original')) return;

                                    if(ele.is('img')) {
                                        ele.attr('src', url);
                                    } else {
                                        ele.css('background-image', 'url(' + url + ')');
                                    }

                                    //执行懒加载动画
                                    that2.lazyloadOut(ele);

                                    //删除数组中已加载好的图片数据，避免重复加载
                                    ele.removeAttr('data-original');
                                }
                            },

                            //从数组中重新加载之前加载失败的图片
                            loadFail: function() {
                                var num = 3;
                                var that2 = this;
                                var settings = loadImgAction.settings;
                                var setId = setInterval(function () {
                                    num--;
                                    var failList = settings.failList;
                                    var len = failList.length;
                                    if (len == 0 || num <= 0) {
                                        clearInterval(setId);
                                        return;
                                    }
                                    var flag = false;
                                    for (var i = 0; i < len; i++) {
                                        if (flag) break;
                                        (function (idx) {
                                            var image = new Image();
                                            image.onload = function () {
                                                var ele = $("img[data-original='" + failList[idx] + "']");
                                                ele.attr('src', failList[idx]);

                                                that2.lazyloadOut(ele);

                                                ele.removeAttr('data-original');

                                                failList.splice(idx, 1);

                                                flag = true;
                                            };
                                            image.src = failList[idx];
                                        })(i);
                                    }
                                }, 1500);
                            },

                            //懒加载动画
                            lazyloadOut: function(ele) {
                                ele.css({
                                    "-webkit-animation-name": "slideOut",
                                    "-webkit-animation-duration": loadImgAction.settings.showTime
                                });
                            },
                        }
                    }

                    loadImgAction.init();
                }
            },

            /*	曝光埋点
             *	@params: exposureObj，需曝光的zepto对象
             *	@params: scrollObj，滚动的容器对象
             */
            exposure: function(exposureObj, scrollObj) {
                var that = this;
                var time = null;
                var scrollObj = scrollObj || $(window);
                var notWindow = scrollObj.selector;
                var winHeight = scrollObj.height() + (notWindow? scrollObj.offset().top: 0);
                var winOffsetTop = winHeight + scrollObj.scrollTop();
                var topData = exposureObj.map(function(i, ele) {
                    return {
                        top: $(ele).offset().top,
                        isExposure: false
                    }
                });

                scrollObj.on('scroll', function(event) {
                    clearTimeout(time);
                    time = setTimeout(function() {
                        sendData(winHeight + scrollObj.scrollTop())
                    }, 200);
                });

                //发送数据
                function sendData(winOffsetTop) {
                    $.each(topData, function(i, ele) {

                        //发送数据后，不再重复发送，即曝光只曝光一次
                        if(ele.isExposure) return;

                        if(winOffsetTop >= ele.top) {
                            ele.isExposure = true;
                            var data = that.handleEventData(exposureObj.eq(i), null, true);
                            data? that.statistics(data.statisticsData): '';
                        }
                    });
                }

                //兼容安卓提前加载webview，高度为0的问题
                if(winHeight == 0) {
                    scrollObj.on('resize', function() {
                        winHeight = scrollObj.height();

                        sendData(winOffsetTop);
                    })
                    return;
                }

                //先执行一次，曝光首屏元素0
                sendData(winOffsetTop);
            },

            //吊起app分享主方法
            //@params 	callback：分享完成之后的回调，可在回调中直接获取分享状态（成功、失败、取消）
            //@params 	type：可定义分享类型，不传时默认吊起分享菜单
            //@params 	noToast：默认为false，可不传，设置为true时为分享成功后不展示toast提示
            nativeShareAction: function(callback, type, noToast) {
                var that = this;

                //设置分享成功后是否展示toast提示，默认为展示
                noToast !== undefined && (app.shareParams.noToast = !!noToast)

                that.deviceType.inApp && that.nativeShare(app.shareParams, callback, type);
            },

            //native分享（新版）
            //@params 	option：分享参数
            //@params 	callback：分享完成之后的回调，可在回调中直接获取分享状态（成功、失败、取消）
            //@params 	type：新版本中支持，可定义分享类型，不传时默认吊起分享菜单
            nativeShare: function(option, callback, type) {
                var that = this;
                jsBridge.callHandler('JsCallNativeMethod', {
                    "action": "share",
                    "needResult": true,
                    "data": {
                        "service": type || 'default',
                        "title": option.title,
                        "url": option.url,
                        "description": option.des,
                        "thumbnailUrl": option.imgUrl,
                        "imageUrl": option.shareImgUrl || '',
                        "extra" : option.extra || {}
                    }
                }, function(result) {
                    if(result.errorCode == 0) {
                        switch (result.data.state) {
                            case 'success':
                                that.getIosPoints(!option.noToast);
                                //app.toast("分享成功");
                                break;
                            case 'fail':
                                // app.toast('分享失败');
                                break;
                            case 'cancel':
                                // app.toast('分享取消');
                                break;
                            case 'not_available':
                                app.toast('您尚未安装微信，暂时无法分享');
                                break;
                        }
                        callback && callback(result)
                        window.shareCb && window.shareCb(result);
                    }
                });
            },

            //ios分享送积分，兼容ios问题，在6.0.16废弃此方法
            getIosPoints: function(noToast) {
                var that = this;

                if(that.getDeviceType() != 'ios') {
                    that.toast("分享成功");
                    return;
                };

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: '//user-center.secoo.com/service/appapi/user/share',
                    data: {
                        bid: 1,
                        t: MD5(new Date().format('yyyyMMdd') + 'd5s02e3f42w3d7lu9ls03lds')
                    },
                    success: function(data) {
                        if(data.retCode == 0) {
                            that.toast(data.retMsg)
                        } else {
                            noToast && that.toast("分享成功");
                        }
                    }
                });
            },

            /*	处理分享参数，内部调用，分享默认带上打开app参数以及顶部标题栏
             *	分享参数优先取 参数中的option，其次是页面初始化设置的分享参数，最后是分享标签div中的参数，如果以上都没有，则取默认分享设置
             *	@params option.title 	分享标题
             *	@params option.des 		分享描述
             *	@params option.url 		分享链接
             *	@params option.imgUrl 	分享图片链接
             *	@params callback 		设置分享参数成功的回调（在m站中是异步的）
             */
            shareOption: function(option, callback) {
                var that = this;
                var shareDom = $('#share');
                var shareDomParams = {
                    title: shareDom.attr('data-title'),
                    des: shareDom.attr('data-description'),
                    url: shareDom.attr('data-url'),
                    imgUrl: shareDom.attr('data-img-url'),
                    noToast: !!shareDom.attr('data-no-toast')
                }
                var defaultShare = that.shareParams;

                //兼容ios下分享链接中pageid不正确的问题，该问题会导致分享后的页面立即打开按钮无法正确吊起app中对应页面，ios将在6.0.18修复此问题
                var shareUrl = defaultShare.url;
                var cuePageId = that.getQueryString('pageid', shareUrl);
                var topicParams = 'topicNew/';
                if(cuePageId.indexOf(topicParams) == -1 && location.pathname == '/api/topic/topic_list_new') {
                    defaultShare.url = shareUrl.replace('pageid=' + cuePageId, 'pageid=' + topicParams + cuePageId);
                }

                comm.tools.deepMerge(defaultShare, shareDomParams, 'notDeep');
                option && comm.tools.deepMerge(defaultShare, option, 'notDeep');

                //显示顶部立即下载
                if(!that.getQueryString('fromShare', defaultShare.url)) {
                    defaultShare.url += (/\?/g.test(defaultShare.url)? "&": "?") + "fromShare=1";
                }

                //微信环境下，对分享逐渐卡紧，可能会造成域名被封，为了防止主站域名被封，影响主要购买流程，所以做如下操作：
                //如果分享链接是：m.secoo.com，并且该链接属于活动页链接类型，则对域名进行转换，将m转换成activity（1-5）
                if(defaultShare && !defaultShare.noChangeHost) {
                    var activityReg = /^(https?|iphone|android):\/\/m.secoo.com\/appActivity\//i;
                    var newHost = 'https://' + wapHost + '.secoo.com/appActivity/'
                    defaultShare.url = defaultShare.url.replace(activityReg, newHost);
                }

                //小程序下，upk是通过url参数传递的，所以在分享时需要删掉分享连接中的用户信息
                var wxUpk = that.getQueryString('_wxupk', defaultShare.url);
                var upkReg = /_wxupk=[^\&]*/g;
                if(wxUpk) {
                    var tempStr = defaultShare.url.match(upkReg)[0];
                    defaultShare.url = defaultShare.url.replace(tempStr, '');
                }

                //设置微信小程序分享参数
                if(window.wx) {
                    defaultShare.type = 5;
                    window.wx.miniProgram.postMessage({data: defaultShare})
                }

                //m站设置分享参数
                if(that.getDeviceType() == 'wap') {
                    that.wapShare(defaultShare, callback);
                    return defaultShare;
                }

                callback && callback(defaultShare);

                return defaultShare;
            },

            //设置m站分享
            wapShare: function(option, callback) {
                var title = option.title,
                    des = option.des,
                    url = option.url,
                    imgUrl = option.imgUrl;

                //触发分享相关操作的回调
                win.mShareTrigger = function() {};

                //分享成功回调
                win.mSareCallback = function() {};

                //取消分享回调
                win.mSareCancel = function() {};

                $.ajax({
                    url: "//weixin.secoo.com/activity/couplet/getSignatureByUrl.do",
                    type: "get",
                    data: "url=" + encodeURIComponent(href),
                    dataType: "jsonp",
                    success: function(result) {
                        wx.config({
                            debug: false,
                            appId: "wxd400b479b9a80bd0",
                            timestamp: result.timestamp,
                            nonceStr: result.noncestr,
                            signature: result.Signature,
                            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
                        }),
                            wx.ready(function() {
                                wx.onMenuShareTimeline({
                                    title: des,
                                    link: url,
                                    imgUrl: imgUrl,
                                    trigger: mShareTrigger,
                                    success: mSareCallback,
                                    cancel: mSareCancel
                                }),
                                    wx.onMenuShareAppMessage({
                                        title: title,
                                        desc: des,
                                        link: url,
                                        imgUrl: imgUrl,
                                        type: "",
                                        dataUrl: "",
                                        trigger: mShareTrigger,
                                        success: mSareCallback,
                                        cancel: mSareCancel
                                    }),
                                    wx.onMenuShareQQ({
                                        title: title,
                                        desc: des,
                                        link: url,
                                        imgUrl: imgUrl,
                                        trigger: mShareTrigger,
                                        success: mSareCallback,
                                        cancel: mSareCancel
                                    }),
                                    wx.onMenuShareWeibo({
                                        title: title,
                                        desc: des,
                                        link: url,
                                        imgUrl: imgUrl,
                                        trigger: mShareTrigger,
                                        success: mSareCallback,
                                        cancel: mSareCancel
                                    })
                            });

                        callback && callback();
                    },
                    error: function(error) {
                        console.log('m站获取微信签名失败，分享到微信的标题、描述将不准确')
                    }
                });
            },

            //判断jsBridge是否完成初始化，初始化完成后在进行下一步操作
            jsBridgeInit: function(callback) {

                if(!this.deviceType.inApp) return;

                if (win.WebViewJavascriptBridge) {
                    callback(win.WebViewJavascriptBridge)
                } else {
                    document.addEventListener('WebViewJavascriptBridgeReady', function() {
                        callback(win.WebViewJavascriptBridge)
                    }, false);
                }
            },

            //判断小程序是否初始化完成
            miniprogramInit: function(callback) {
                var that = this;

                if(that.getDeviceType() == 'miniProgram') {
                    // if(that.cookie('isMiniProgram')) {
                    // 	that.miniprogramAction();

                    // 	callback && callback();
                    // } else {
                    wx.miniProgram.getEnv(function(res) {
                        if(res.miniprogram) {
                            that.miniprogramAction();

                            // that.cookie('isMiniProgram', true);

                            //设置小程序分享参数
                            wx.miniProgram.postMessage({data: app.shareParams});

                            callback && callback();
                        }
                    });
                    // }
                }
            },

            //小程序初始化方法
            miniprogramAction: function() {
                this.deviceType.miniProgram = true;
                $('#header').hide();
            },

            /*	初始化ios相关功能
             *	1.根据版本号决定初始化jsBridge，版本号也决定用哪种事件绑定方式进行事件绑定
             *	2.ios一直都是直接引入jsbridge.js，所以需要jsbridge先初始化完成，然后再判断版本号绑定事件
             */
            iosAction: function(callback) {
                var that = this;
                var getDeviceType = that.getDeviceType();

                if(getDeviceType == 'ios') {
                    that.jsBridgeInit(function(jsBridge) {
                        //全局jsbridge挂载到window上
                        win.jsBridge = jsBridge;

                        //兼容旧版ios的jsBridge
                        win.Comm = {
                            content: {
                                bridge: jsBridge
                            },
                            callNative: function(params) {},
                        };

                        //兼容旧版app，设置页面完成事件（目前只发现设置右上角按钮功能）
                        jsBridge.callHandler("jsDocumentDidFinishLoading", "", function() {})

                        //事件绑定
                        that.bindEvent();

                        //初始化设备信息
                        that.initAppInfo();

                        callback && callback();
                    });
                }
            },

            /*	初始化android相关功能
             *	1.根据版本号决定初始化jsBridge，版本号也决定用哪种事件绑定方式进行事件绑定
             *	2.android端从全新版本6.0.12开始引入jsbridge.js，早先的版本是jsbridge直接注入到webview中，
             *	并且获取版本号不需要native方法支持，所以安卓中需要先判断版本号，根据版本号决定是否初始化jsBridge（新版本需要，旧版不需要），
             *	最后再执行事件绑定，
             */
            androidAction: function(callback) {
                var that = this;
                var getDeviceType = that.getDeviceType();

                if(getDeviceType == 'android') {
                    //对比版本号，决定绑定事件的方式
                    if(app.newVersion) {
                        that.jsBridgeInit(function(jsBridge) {

                            //全局jsbridge挂载到window上
                            win.jsBridge = jsBridge;

                            //兼容旧版安卓的jsBridge，旧版第一个字母为大写
                            win.JsBridge = jsBridge;

                            //事件绑定
                            that.bindEvent();
                            console.log('新方法绑定')

                            //初始化设备信息
                            that.initAppInfo();

                            //初始化安卓个别版本pv
                            that.initAndroidPv();

                            callback && callback();
                        });
                    } else {
                        //兼容旧版安卓的jsBridge，旧版第一个字母为大写
                        win.jsBridge = win.JsBridge;

                        //事件绑定
                        that.bindEvent();
                        console.log('旧方法绑定')

                        callback && callback();
                    }
                }
            },

            //native完成初始化，集成了ios、安卓的初始化方法，并对旧版本app做了兼容
            nativeAction: function(callback) {
                var that = this;

                if(!that.deviceType.inApp) return;

                //兼容旧版右上角分享功能，右上角分享按钮会调用window下的nativeShare方法
                win.nativeShare = app.nativeShareAction.bind(app);

                //安卓初始化
                that.androidAction(callback);

                //ios初始化
                that.iosAction(callback);
            },

            //初始化m站相关功能
            wapAction: function(option) {
                var that = this;

                if(comm.exports.deviceType.inApp) return;

                //初始化微信小程序内部方法
                that.miniprogramInit();

                //m站初始化头部，非m站不起作用
                that.headBarInit(option);

                //m站执行事件绑定
                that.bindEvent();

                //加载m站统计mar.js
                that.getDeviceType() == 'wap' && that.loadJs('//mstatic.secooimg.com/activity2018/js/comm/mar.js', function() {}, 'async');
            },

            //初始化设备信息
            initAppInfo: function() {
                var that = this;

                if(!comm.isInit && that.newVersion) {
                    jsBridge.callHandler('JsCallNativeMethod', {
                        "action":"getAppInfo",
                        "needResult":true
                    }, function (response) {
                        that.appInfo = response.data;			//挂载设备信息
                    });
                }
            },
            /*====================基础公共方法==================*/
            /*========================end======================*/

            //android个别版本没有埋点，需统计pv，要对6.1.0--->6.1.18版本进行埋点
            initAndroidPv: function() {
                app.matchVersion({android: '6.1.19'}, function() {}, function() {
                    jsBridge.callHandler('JsCallNativeMethod', {
                        "action":"getAppInfo",
                        "needResult":true
                    }, function (appInfo) {
                        //挂载设备信息
                        appInfo = appInfo.data;

                        var deviceId = appInfo.deviceId;
                        var imei = deviceId;
                        var uuid = deviceId;
                        if(deviceId.indexOf('_') > 0) {
                            imei = deviceId.split('_')[0];
                        }
                        app.getUpk(function(upk) {
                            jsBridge.callHandler('JsCallNativeMethod', {
                                "action":"getNetworkInfo",
                                "needResult":true
                            }, function(result) {
                                var networkType  = {
                                    '1': 'WIFI',
                                    '2': 'OTHER',
                                    '3': '2G',
                                    '4': '3G',
                                    '5': '4G'
                                }
                                var curDate = new Date();
                                var pvData = {
                                    's.paid': app.pageid,
                                    's.ot': 1,
                                    's.imei': imei,
                                    's.uuid': uuid,
                                    's.cid': appInfo.channel,
                                    's.uid': upk,
                                    's.ntt': networkType[result.data.networkType],
                                    's.cv': appInfo.appVersion,
                                    's.appid': appInfo.appId,
                                    's.optm': Math.round(curDate.getTime()/1000),
                                    's.ltm': curDate.format('yyyy-MM-dd hh:mm:ss')
                                };

                                $.post("//datacollect.secoo.com/c/dcs.gif", app.jsonToUrlParams(pvData));
                            });
                        })
                    });
                })
            },

            //初始化酷叽弹窗
            initKuji: function() {
                var that = this;
                var kujiIsShow = [];	//酷叽弹窗是否已弹出，一个页面可配置多个位置触发弹窗，所以用数组存储各个位置的触发状态，默认false
                var win = $(window);
                var winHeight = win.height()
                var screenVal = win.width() / winHeight;	//宽高比
                var eventName = 'scroll.kuji';

                that.matchVersion({ios: '7.6.1', android: '7.6.2'}, function() {
                    jsBridge.callHandler('JsCallNativeMethod', {
                        "action": "getWebKujiConfig",
                        "needResult": true
                    }, function(result) {
                        if(result.errorCode == 0) {
                            $.each(result.data, function(i, ele) {
                                var actionType = ele.actionType;
                                var urls = ele.params.split(',');
                                var kujiOption = {
                                    "triggerHeight": ele.triggerHeight,
                                    "actionType": actionType
                                }
                                switch (+actionType) {
                                    case 7: //三期模板短id
                                        matchPage(urls, app.getPageId(), function(curUrl) {
                                            kujiFn(kujiOption, curUrl, i)
                                        })
                                        break;
                                    case 8: //h5全链接
                                        matchPage(urls, window.location.href, function(curUrl) {
                                            kujiFn(kujiOption, curUrl, i)
                                        })
                                        break;
                                }
                            })
                        }
                    })
                });

                function matchPage(urlArr, url, callback) {
                    $.each(urlArr, function(i, ele) {
                        ele == url && callback && callback(ele);
                    });
                }

                function showKuji(kujiOption, i) {
                    // 当前数组中的酷叽已触发就直接退出，并解除相关滚动方法
                    if(kujiIsShow[i]) {
                        win.off(eventName + i);
                        return;
                    }
                    var scrollVal = $(win).scrollTop() + winHeight;
                    if(scrollVal >= transformHeight(kujiOption.triggerHeight)) {
                        jsBridge.callHandler('JsCallNativeMethod', {
                            "action": "showKuji",
                            "needResult": true,
                            "data": kujiOption,
                        }, function(res) {
                            if(res.errorCode == 0) {
                                kujiIsShow[i] = true;	//酷叽已弹出
                            }
                            win.off(eventName + i);	//解除酷叽的相关滚动事件
                        })
                    }
                }

                // 转换高度，中台提供的高度值为原始的px值，需转换成当前窗口内的实际px值
                function transformHeight(height_px) {
                    return height_px * screenVal;
                }

                // 酷叽主方法
                function kujiFn(kujiOption, curUrl, i) {

                    if(!curUrl) return;

                    kujiIsShow[i] = false;

                    // 配置当前页面的url
                    kujiOption['params'] = curUrl;

                    // 先执行一次酷叽弹窗，判断是否在当前窗口内
                    showKuji(kujiOption, i);

                    //滚动停止后加载
                    var time = null;
                    win.on(eventName + i, function() {
                        clearTimeout(time);
                        time = setTimeout(function() {
                            showKuji(kujiOption, i);
                        }, 100);
                    })
                }
            },

            //页面初始化
            init: function(option) {

                var that = this;

                //设置页面rem，默认值为页面宽度的10分之1
                pageConfig.setRem !== false && comm.setRem(pageConfig.baseRemVal || 10);

                //扩展原生方法
                comm.extendOriginObj();

                //加载听云监控js
                //that.loadJs('//mstatic.secooimg.com/js/tingyun-rum.js', function() {}, 'async');

                //初始化设备类型
                that.getDeviceType();

                //兼容旧页面，防止报错
                window.loadJs = app;
                window.getCookie = app.cookie;

                //初始化页面id
                that.getPageId();

                //在m站添加google/百度统计
                if(!comm.exports.deviceType.inApp) {
                    comm.statistic.google();
                }

                pageConfig.useSensors != false && comm.statistic.sensors({
                    sdk_url: 'https://mstatic.secooimg.com/sensors/sensorsdata.min.js',
                    heatmap_url: 'https://mstatic.secooimg.com/sensors/heatmap.min.js',
                    name: 'sensors',

                    // 测试链接
                    // web_url: 'https://sensorsdata.secoo.com/',
                    // server_url: 'https://collect.secoo.com/sa',

                    // 正式链接
                    web_url: 'https://sensorsdata.secoo.com/?project=production',
                    server_url: 'https://collect.secoo.com/sa?project=production',

                    heatmap: {
                        //是否开启点击图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
                        //需要 JSSDK 版本号大于 1.7
                        clickmap:'default',

                        //是否开启触达注意力图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
                        //需要 JSSDK 版本号大于 1.9.1

                        scroll_notice_map:'default',

                        //设置成 true 后，我们会自动给 a 标签绑定一个 sa.trackLink() 方法（详见本页 3.3 ）。
                        //如果是单页面 a 标签不涉及页面跳转或者 a 标签的点击是下载功能，建议不要打开。默认 false 。
                        isTrackLink: false,

                        //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
                        loadTimeout:  3000,

                        //返回真会采集当前页面的数据，返回假表示不采集当前页面,设置这个函数后，内容为空的话，是返回假的。不设置函数默认是采集所有页面
                        // collect_url: function(){
                        //     //如果只采集首页
                        //     if(location.href === 'xxx.com/index.html' || location.href === 'xxx.com/'){
                        //         return true;
                        //     }
                        // },

                        //用户点击（a，button，input）这些元素时会触发这个函数，让你来判断是否要采集当前这个元素，返回真表示采集，返回假表示不采集。
                        //不设置这个函数，默认是采集 a button input 这些标签。
                        // collect_element: function(element_target){
                        //     // 如果这个元素有属性sensors-disable=true时候，不采集
                        //     if(element_target.getAttribute('sensors-disable') === 'true'){
                        //         return false;
                        //     }else{
                        //         return true;
                        //     }
                        // },

                        //考虑到用户隐私，这里可以设置input里的内容是否采集
                        //如果返回真，表示采集input内容，返回假表示不采集input内容,默认不采集
                        collect_input:function(element_target){
                            return false;
                        },

                        //假如要在 $WebClick 事件增加自定义属性，可以通过（a，button，input）这三类标签的特征来判断是否要增加
                        // custom_property:function( element_target ){
                        //     //比如您需要给有 data=test 属性的标签的点击事件增加自定义属性 name:'aa' ，则代码如下
                        //     if(element_target.getAttribute('data') === 'test'){
                        //         return {
                        //             name:'aa'
                        //         }
                        //     }
                        // },

                        //SDK默认优先以元素ID作为选择器采集点击事件，若不想以ID作为选择器，可以设置该参数为'not_use_id'（1.12.1以上版本支持）
                        element_selector:'not_use_id',

                        //第二版点击图滚动滚动条，改变页面尺寸后延时多少毫秒重新渲染页面
                        renderRefreshTime:1000,

                        // 设置触达图的有效停留时间，默认超过4秒以上算有效停留
                        scroll_delay_time: 4000
                    },

                    //是否在控制台打印埋点结果，有输出代表埋点成功
                    show_log: !!pageConfig.showSensorsLog || false,

                    // 是否开启app与h5打通
                    // use_app_track: false
                    use_app_track: comm.exports.deviceType.inApp,
                });

                /*	加载相关js并执行回调，
                 *	第一个回调为全部js加载完执行的回调，执行时间更滞后
                 *	第二个回调为zepto加载完执行的回调，优先执行
                 */
                that.loadJs(comm.tools.concatJs(option? option.loadJsArr: []), function() {

                    //初始化分享参数
                    app.shareOption(option && option.share? option.share: null);

                    if(app.deviceType.inApp) {	//初始化native相关方法
                        app.nativeAction(function() {
                            app.initKuji();		// 酷叽弹窗初始化
                            initPageFn();
                        });
                    } else {	//m站初始化相关方法
                        app.wapAction(option);
                        initPageFn();
                    }

                    //外层存在该方法优先调用
                    function initPageFn() {

                        //页面已完成初始化
                        comm.isInit = true;

                        pageConfig.jsLoaded && pageConfig.jsLoaded();
                        win.jsLoaded && win.jsLoaded();

                        //兼容旧模板方法
                        win.addScript && win.addScript();
                    }

                }, false, function() {

                    //设置接口请求cookie
                    if(!app.cookie('appsource')) {
                        app.cookie('appsource', '60', '', 'secoo.com');
                    }

                    //图片懒加载初始化
                    app.lazyLoadImg();

                    //执行图片懒加载
                    (pageConfig.imgLazyLoad != false) && $('[data-original]').picLazyLoad();

                    //加载商品活动价格，此为无法修改erp模板的无奈之举
                    that.setProductPrice();

                    //初始化m站toast提示，非m站不起作用
                    app.toast();

                    //外层存在该方法优先调用
                    pageConfig.zeptoLoaded && pageConfig.zeptoLoaded();
                    win.zeptoLoaded && win.zeptoLoaded();
                });
            },
        }
    }

    return comm.exports;
})(window, document);

//页面初始化
app.init(window.pageConfig || {});
