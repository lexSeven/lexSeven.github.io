(function(t){function e(e){for(var n,o,s=e[0],c=e[1],l=e[2],d=0,v=[];d<s.length;d++)o=s[d],i[o]&&v.push(i[o][0]),i[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(v.length)v.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==i[c]&&(n=!1)}n&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},i={canvas:0},r=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("0e36")},"026c":function(t,e,a){"use strict";var n=a("379c"),i=a.n(n);i.a},"063a":function(t,e,a){"use strict";a.d(e,"b",function(){return v}),a.d(e,"c",function(){return p});var n=a("cebc"),i=a("795b"),r=a.n(i),o=a("bc3a"),s=a.n(o),c=a("4328"),l=a.n(c),u={timeout:1e4,responseType:"json",withCredentials:!1,headers:{"Content-Type":"application/json;charset=UTF-8"}},d=s.a.create(u);d.interceptors.request.use(function(t){if("post"===t.method&&t.data){var e=t.data;t.headers["Content-Type"].indexOf("urlencoded")>-1?t.data=l.a.stringify(e):t.data=e}return t},function(t){return r.a.reject(t)}),d.interceptors.response.use(function(t){return t.data},function(t){return r.a.reject(t)});var v=function(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return d.get(t,{params:e},Object(n["a"])({},u,a))},p=function(t,e){return e.config||(e.config={}),d.post(t,e.data,Object(n["a"])({},u,e.config))};e["a"]={}},"0e36":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrap",attrs:{id:"app"}},[a("div",{staticClass:"content swiper-container"},[a("div",{staticClass:"swiper-wrapper"},t._l(t.videoList,function(e){return a("div",{staticClass:"item swiper-slide",attrs:{"data-video":e.video},on:{click:t.playvideo}},[a("img",{attrs:{src:e.coverImg}}),a("video",{staticClass:"video",attrs:{preload:"auto",width:"100",height:"200",playsinline:"true","webkit-playsinline":"true","x5-video-player-type":"h5","x5-video-player-fullscreen":"true","x5-video-orientation":"portraint"}},[a("source",{attrs:{src:e.video}})]),a("div",{staticClass:"canvas"})])}),0)])])},i=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stepTwo wrap"},[a("div",{ref:"content",staticClass:"content"},[t._m(0),a("div",{staticClass:"inputBox"},[a("div",{staticClass:"inputBoxTitle"},[t._v("活动主题")]),a("div",{staticClass:"line"},[a("input",{ref:"activeName",staticClass:"input",attrs:{type:"text",placeholder:"输入活动名称",maxlength:"20"},domProps:{value:t.activeName}}),a("i",{staticClass:"icon icon-searchDelete",attrs:{"data-type":"activeName"},on:{mousedown:t.clearContent}})])]),a("div",{staticClass:"inputBox"},[a("div",{staticClass:"inputBoxTitle"},[t._v("微信号")]),a("div",{staticClass:"line"},[a("input",{ref:"wechat",staticClass:"input",attrs:{type:"text",placeholder:"输入个人微信号",maxlength:"30"},domProps:{value:t.weChat}}),a("i",{staticClass:"icon icon-searchDelete",attrs:{"data-type":"weChat"},on:{mousedown:t.clearContent}})])]),a("div",{staticClass:"inputBoxDes"},[t._v("请填写正确的微信号以便参与活动的用户联系您，寺库将严格保密用个人隐私")]),a("div",{staticClass:"activeDesTit"},[t._v("活动描述")]),a("textarea",{ref:"activeDes",staticClass:"activeDesInput",attrs:{maxlength:"500"},domProps:{value:t.activeDes}}),a("div",{staticClass:"inputBoxDes"},[t._v("请清晰的描述本次活动，如活动流程、人员要求、注意事项等，5-500字")]),a("div",{staticClass:"nextBtn",on:{click:t.conformSend}},[a("span",[t._v("确认发布")])])]),a("div",{ref:"alertBoxMark",staticClass:"alertBoxMark",on:{click:t.hidalertBox}}),a("div",{ref:"alertBox",staticClass:"alertBox"},[a("div",{staticClass:"title"},[t._v("实名认证")]),a("div",{staticClass:"text"},[t._v("\n            您还没有实名认证，为了您的安全，请先实名认证\n        ")]),a("div",{staticClass:"buttonLine"},[a("span",{on:{click:t.hidalertBox}},[t._v("暂不认证")]),a("span",{staticClass:"active",on:{click:function(e){return t.changeShow(3)}}},[t._v("立即认证")])])])])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progressBox"},[a("div",{staticClass:"line"},[a("span",{staticClass:"proDom",staticStyle:{width:"50%"}}),a("i",{staticClass:"moveDom"})]),a("div",{staticClass:"progressNum"},[t._v("2/2")])])}],s=(a("96cf"),a("3b8d")),c=a("f499"),l=a.n(c),u=a("5176"),d=a.n(u),v=a("dde5"),p=a("90b9"),f={name:"about",data:function(){return{name:"home组件",activeName:"",weChat:"",activeDes:"",parentData:{},upk:"",isRealName:!1,isSend:!1}},created:function(){var t=this;app.newVersion&&jsBridge.callHandler("JsCallNativeMethod",{action:"disableRefresh"}),app.getUpk(function(e){t.upk=e});var e=localStorage.getItem("parentData");e&&(e=JSON.parse(e)),d()(t.parentData,e),this.parentData.activeName&&(this.activeName=this.parentData.activeName),this.parentData.weChat&&(this.weChat=this.parentData.weChat),this.parentData.activeDes&&(this.activeDes=this.parentData.activeDes),jsBridge.registerHandler("beforeLeave",function(e){""!==localStorage.getItem("parentData")?t.setBackButton():t.closeReturn("1")}),jsBridge.callHandler("JsCallNativeMethod",{action:"updateUI",data:[{viewId:"leftTopItemFirst",imageResId:"img_back",cornerRadius:"2",onClick:"beforeLeave"}]})},props:{changeShow:{type:Function}},watch:{activeName:function(t){this.parentData.activeName=t,localStorage.setItem("parentData",l()(this.parentData))},weChat:function(t){this.parentData.weChat=t,localStorage.setItem("parentData",l()(this.parentData))},activeDes:function(t){this.parentData.activeDes=t,localStorage.setItem("parentData",l()(this.parentData))}},methods:{saveLocalStorage:function(){localStorage.setItem("parentData",l()(this.parentData)),localStorage.setItem("nowPage",2)},setBackButton:function(){var t=this;jsBridge.registerHandler("saveMessage",function(e){t.saveLocalStorage(),t.closeReturn("1")}),jsBridge.registerHandler("close",function(e){localStorage.setItem("parentData",""),localStorage.setItem("nowPage",1),t.closeReturn("1")}),jsBridge.callHandler("JsCallNativeMethod",{action:"updateUI",data:{viewId:"dialog",message:"将此次编辑保留？",visibility:"visible",cancelable:!0,cancelOnTouchOutside:!0,buttons:[{text:"不保留",jsHandle:"close"},{text:"保留",jsHandle:"saveMessage"}]}})},closePage:function(t){var e=this;"android"===e.deviceType?jsBridge.closePage(t):"ios"===e.deviceType?Comm.content.bridge.callHandler("WVJS_popViewController",{count:t}):app.deviceType.miniProgram?wx.miniProgram.navigateBack({delta:t}):history.go(-t)},closeReturn:function(t){var e=this;app.newVersion?jsBridge.callHandler("JsCallNativeMethod",{action:"closePage",data:{count:t}}):e.closePage(t)},pushInvitation:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var a,n,i,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v["a"].pushInvitation(e.parame);case 3:a=t.sent,n=a.code,i=a.data,r=a.msg,200===n?e.success&&e.success(i):(e.error&&e.error({code:n,data:i,msg:r}),console.log(r)),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log("网络请求失败");case 13:case"end":return t.stop()}},t,null,[[0,10]])}));function e(e){return t.apply(this,arguments)}return e}(),isAuthentication:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var a,n,i,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v["a"].isAuthentication(e.parame);case 3:a=t.sent,n=a.code,i=a.data,r=a.msg,204===n?e.success&&e.success({code:n,data:i,msg:r}):e.error&&e.error({code:n,data:i,msg:r}),t.next=12;break;case 10:t.prev=10,t.t0=t["catch"](0);case 12:case"end":return t.stop()}},t,null,[[0,10]])}));function e(e){return t.apply(this,arguments)}return e}(),clearContent:function(t){var e=t.currentTarget.parentNode.querySelector("input");this[t.currentTarget.dataset.type]="",e.value="",e.blur()},goPage:function(t){var e={url:t.url||"",router:t.router||"",params:t.params||""};app.goPage({type:"url",url:Object(p["a"])(e)})},showalertBox:function(){var t=this;t.$refs.content.classList.add("filter"),t.$refs.alertBoxMark.style.display="block",t.$refs.alertBox.style.display="block",setTimeout(function(){t.$refs.alertBoxMark.classList.add("active"),t.$refs.alertBox.classList.add("active")},50)},hidalertBox:function(){var t=this;t.$refs.content.classList.remove("filter"),t.$refs.alertBoxMark.classList.remove("active"),t.$refs.alertBox.classList.remove("active"),setTimeout(function(){t.$refs.alertBoxMark.style.display="none",t.$refs.alertBox.style.display="none",t.isSend=!1},300)},conformSend:function(){var t=this;t.isSend||(""!==this.activeName?this.activeName.length<2?alert("活动名称太短啦！"):""!==this.weChat?""!==this.activeDes?this.activeDes.length<5?alert("感觉活动描述不太清晰哦，请再说点什么吧~"):this.activeDes.length>500?alert("描述太多啦！"):(this.parentData.remark=this.activeDes,this.parentData.weChat=this.weChat,this.parentData.invitationName=this.activeName,localStorage.setItem("parentData",l()(this.parentData)),t.isSend=!0,t.isAuthentication({parame:{upk:t.upk},success:function(){t.showalertBox()},error:function(e){205===e.code?(t.isRealName=!0,t.pushInvitation({parame:{data:t.parentData},success:function(e){t.changeShow(1),t.activeName="",t.weChat="",t.activeDes="",localStorage.setItem("parentData",""),t.isSend=!1,setTimeout(function(){t.goPage({url:"detail",params:"invitationId="+e.invitationId+"&publish=1"})},40)}})):app.toast(e.msg)}})):alert("请输入活动描述"):alert("请输入个人微信号"):alert("请输入活动名称"))},analysis:function(t){var e=t.data||{};e["s.paid"]=2460,e["s.ot"]=2,e["s.opid"]=2462,app.statistics(e)}},mounted:function(){console.log("two");var t=this;t.$refs.activeName.addEventListener("blur",function(){this.value&&(t.activeName=this.value)}),t.$refs.activeName.addEventListener("input",function(){this.value&&(t.activeName=this.value)}),t.$refs.wechat.addEventListener("blur",function(){this.value&&(t.weChat=this.value)}),t.$refs.wechat.addEventListener("input",function(){this.value&&(t.weChat=this.value)}),t.$refs.activeDes.addEventListener("blur",function(){this.value&&(t.activeDes=this.value)}),t.$refs.activeDes.addEventListener("input",function(){this.value&&(t.activeDes=this.value)})}},h=f,m=a("2877"),g=Object(m["a"])(h,r,o,!1,null,null,null),b=g.exports,w=a("41d6"),j={name:"App",data:function(){return{src:"",autoplay:"",controls:"",loop:"",poster:"",videoList:[{video:"https://voddafz06jj.vod.126.net/voddafz06jj/aOkmUaVj_2418171963_shd.mp4",coverImg:"http://voddafz06jj.nosdn.127.net/4a6b00f8-bbb3-4285-9d7d-2bd04ab0703e_1_0_0.jpg"},{video:"https://voddafz06jj.vod.126.net/voddafz06jj/fKJNEYUR_2436440063_shd.mp4",coverImg:"http://voddafz06jj.nosdn.127.net/ca940095-4d96-4d76-8b85-33f6f4bbd299_1_0_0.jpg"},{video:"https://voddafz06jj.vod.126.net/voddafz06jj/8VAjHP1l_2415707586_shd.mp4",coverImg:"http://voddafz06jj.nosdn.127.net/37fb9b9a-a12b-4b03-8a30-eff8774becde_1_0_0.jpg"},{video:"https://voddafz06jj.vod.126.net/voddafz06jj/9DmpwyhP_2473198695_shd.mp4",coverImg:"http://voddafz06jj.nosdn.127.net/51967b10-245b-4e73-b0f4-d045058b259f_1_0_0.jpg"},{video:"https://voddafz06jj.vod.126.net/voddafz06jj/AwDAJqrx_2433929257_shd.mp4",coverImg:"http://voddafz06jj.nosdn.127.net/bb58916a-a777-40d6-8957-d9519a04fed9_1_0_0.jpg"}],playStatus:!1,parentNode:document.querySelector(".swiper-wrapper"),now:0,showItem:1,scrollwidth:window.innerWidth,scrollheight:window.innerHeight}},methods:{playvideo:function(t,e){var a=this,n=e&&e.obj||t.currentTarget;a.playStatus?(a.videoDOM.pause(),n.classList.remove("active"),a.playStatus=!1):(a.playStatus=!0,n.classList.add("active"),a.play({obj:n}))},play:function(t){var e=this;e.timer=null,e.videoDOM=t.obj.querySelector(".video"),e.videoDOM.play(),e.canvasDom=t.obj.querySelector("canvas"),e.canvasDom.width=e.scrollwidth/3,e.canvasDom.height=e.scrollheight/3,e.player=e.canvasDom.getContext("2d"),e.duration=e.videoDOM.duration,e.draw()},draw:function(){var t=this;if(t.videoDOM.paused||t.videoDOM.ended)return cancelAnimationFrame(t.timer),!1;t.player.drawImage(t.videoDOM,0,0,t.scrollwidth,t.scrollheight),t.timer=requestAnimationFrame(function(){t.draw()})},watchPlay:function(){var t=page;t.watch=setInterval(function(){console.log(t.nowVideo.paused)})}},computed:{},updated:function(){},mounted:function(){var t=this;t.scrollwidth=window.innerWidth,t.scrollheight=window.innerHeight,t.swiper=new w["a"](".content",{direction:"vertical",on:{slideChangeTransitionEnd:function(){t.nowVideo.pause(),t.playStatus=!1,t.playvideo({obj:this.el.querySelectorAll(".swiper-slide")[this.activeIndex]}),alert(this.activeIndex)}}})},components:{stepTwo:b}},y=j,C=(a("026c"),Object(m["a"])(y,n,i,!1,null,"0e239bb6",null)),D=C.exports,_=a("5e9c"),x=a("bb9a"),O=a.n(x),S=a("a050"),I=a.n(S);Object(_["a"])({store:O.a,router:I.a,render:function(t){return t(D)}})},"379c":function(t,e,a){},"5e9c":function(t,e,a){"use strict";var n=a("cebc"),i=a("2b0e"),r=a("063a");a("70ea");function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#app";new i["a"](Object(n["a"])({el:e},t))}a.d(e,"a",function(){return o}),i["a"].prototype.$http=r["a"]},"70ea":function(t,e,a){},"90b9":function(t,e,a){"use strict";a.d(e,"b",function(){return n}),a.d(e,"a",function(){return i});a("3b2b"),a("a481"),a("c5f6");var n=function(){var t=Object({NODE_ENV:"production",VUE_APP_TITLE:"生产环境",VUE_APP_URL_CONTENT:"https://www.baidu.com",BASE_URL:"/"});return{url:{content:t.VUE_APP_URL_CONTENT,life:t.VUE_APP_URL_LIFE,invitation:t.VUE_APP_URL_IVATATION}}},i=function(t){var e=t.url,a=t.router,n=void 0===a?"":a,i=t.params,r=void 0===i?"":i;return n=n.trim().length>0?"#/"+n:"",r=r.trim().length>0?"?"+r:"","test"+e.trim()+".html"+n+r}},a050:function(t,e){},bb9a:function(t,e){},dde5:function(t,e,a){"use strict";var n=a("063a"),i=a("90b9"),r=Object(i["b"])(),o=r.url,s=o.life,c=o.invitation,l=o.content;e["a"]={getInviteDetail:function(t){return Object(n["b"])("".concat(c,"/invitation/detail"),t)},getStoreDistance:function(t){return Object(n["c"])("".concat(s,"/api/v1/store/portion/details"),t)},getRecordList:function(t){return Object(n["b"])("".concat(c,"/invitation/recordList"),t)},signUp:function(t){return Object(n["c"])("".concat(c,"/invitation/join"),t)},getWxCode:function(t){return Object(n["b"])("".concat(c,"/invitation/getWeChat"),t)},checkSubmit:function(t){return Object(n["c"])("".concat(c,"/invitation/audit"),t)},getHomePageBanner:function(t){return Object(n["b"])("".concat(c,"/banner/list"),t)},gethotCityList:function(t){return Object(n["b"])("".concat(c,"/invitation/hotCitys"),t)},getInvitationList:function(t){return Object(n["b"])("".concat(c,"/invitation/list"),t)},getCityCode:function(t){return Object(n["c"])("".concat(c,"/invitation/cityCodeConvert"),t)},getStoreList:function(t){return Object(n["c"])("".concat(s,"/api/v1/store/list"),t)},getStoreCityList:function(t){return Object(n["b"])("".concat(s,"/api/v1/store/cities"),t)},getInvitationType:function(t){return Object(n["b"])("".concat(c,"/invitationType/list"),t)},authentication:function(t){return Object(n["c"])("".concat(c,"/invitation/realNameValidate"),t)},isAuthentication:function(t){return Object(n["b"])("".concat(c,"/invitation/verify/realName"),t)},pushInvitation:function(t){return Object(n["c"])("".concat(c,"/invitation/publish"),t)},uploadFile:function(t){return Object(n["c"])("".concat(l,"/content-service/api/upload/cutUpload"),t)}}}});
//# sourceMappingURL=canvas.8bf2a788.js.map