<template>
    <div class="stepTwo wrap">
        <div class="content" ref="content">
            <div class="progressBox">
                <div class="line">
                    <span class="proDom" style="width: 50%;"></span>
                    <i class="moveDom"></i>
                </div>
                <div class="progressNum">2/2</div>
            </div>
            <div class="inputBox">
                <div class="inputBoxTitle">活动主题</div>
                <div class="line">
                    <input
                        type="text"
                        class="input"
                        ref="activeName"
                        placeholder="输入活动名称"
                        maxlength="20"
                        :value="activeName"
                    >
                    <i
                        class="icon icon-searchDelete"
                        data-type="activeName"
                        @mousedown="clearContent"></i>
                </div>
            </div>
            <div class="inputBox">
                <div class="inputBoxTitle">微信号</div>
                <div class="line">
                    <input
                        :value="weChat"
                        type="text"
                        class="input"
                        ref="wechat"
                        placeholder="输入个人微信号"
                        maxlength="30"
                    >
                    <i
                        class="icon icon-searchDelete"
                        data-type="weChat"
                        @mousedown="clearContent"></i>
                </div>
            </div>
            <div class="inputBoxDes">请填写正确的微信号以便参与活动的用户联系您，寺库将严格保密用个人隐私</div>
            <div class="activeDesTit">活动描述</div>
            <textarea
                :value="activeDes"
                class="activeDesInput"
                ref="activeDes"
                maxlength="500"></textarea>
            <div class="inputBoxDes">请清晰的描述本次活动，如活动流程、人员要求、注意事项等，5-500字</div>
            <div class="nextBtn" @click="conformSend">
                <span>确认发布</span>
            </div>
        </div>
        <div class="alertBoxMark" ref="alertBoxMark" @click="hidalertBox"></div>
        <div class="alertBox" ref="alertBox">
            <div class="title">实名认证</div>
            <div class="text">
                您还没有实名认证，为了您的安全，请先实名认证
            </div>
            <div class="buttonLine">
                <span @click="hidalertBox">暂不认证</span>
                <span class="active" @click="changeShow(3)">立即认证</span>
            </div>
        </div>
    </div>
</template>
<script>
import api from 'services/index'
import { concatUrl } from 'common/utils'
export default {
    name: 'about',
    data () {
        return {
            name: 'home组件',
            activeName: '', // 活动名称
            weChat: '', // 个人微信号
            activeDes: '', // 活动描述
            parentData: {},
            upk: '',
            isRealName: false,
            isSend: false
        }
    },
    created: function () {
        var _this = this

        // 禁止app下拉刷新
        app.newVersion && jsBridge.callHandler('JsCallNativeMethod', {
            'action': 'disableRefresh'
        })

        // 获取UPK
        app.getUpk(function (upk) {
            _this.upk = upk
        })

        var location = localStorage.getItem('parentData')
        location && (location = JSON.parse(location))
        Object.assign(_this.parentData, location)
        this.parentData.activeName && (this.activeName = this.parentData.activeName)
        this.parentData.weChat && (this.weChat = this.parentData.weChat)
        this.parentData.activeDes && (this.activeDes = this.parentData.activeDes)

        // 关闭页面的时候判断内容是否为空
        jsBridge.registerHandler('beforeLeave', function (arg) {
            if (localStorage.getItem('parentData') !== '') {
                _this.setBackButton()
            } else {
                _this.closeReturn('1')
            }
        })

        jsBridge.callHandler('JsCallNativeMethod', {
            'action': 'updateUI',
            'data': [
                {
                    'viewId': 'leftTopItemFirst',
                    'imageResId': 'img_back',
                    'cornerRadius': '2',
                    'onClick': 'beforeLeave'
                }
            ]
        })

    },
    props: {
        changeShow: {
            type: Function
        }
    },
    watch: {
        activeName: function (val) {
            this.parentData.activeName = val
            localStorage.setItem('parentData', JSON.stringify(this.parentData))
        },
        weChat: function (val) {
            this.parentData.weChat = val
            localStorage.setItem('parentData', JSON.stringify(this.parentData))
        },
        activeDes: function (val) {
            this.parentData.activeDes = val
            localStorage.setItem('parentData', JSON.stringify(this.parentData))
        }
    },
    methods: {
        // 保存本地数据
        saveLocalStorage: function () {
            localStorage.setItem('parentData', JSON.stringify(this.parentData))
            localStorage.setItem('nowPage', 2)
        },
        // 设置回退按钮
        setBackButton: function () {
            var _this = this
            jsBridge.registerHandler('saveMessage', function (arg) {
                // 保存点击返回发布页的数据
                _this.saveLocalStorage()
                _this.closeReturn('1')
            })
            jsBridge.registerHandler('close', function (arg) {
                localStorage.setItem('parentData', '')
                localStorage.setItem('nowPage', 1)
                _this.closeReturn('1')
            })
            jsBridge.callHandler('JsCallNativeMethod', {
                'action': 'updateUI',
                'data': {
                    'viewId': 'dialog',
                    // 'title': '',
                    'message': '将此次编辑保留？',
                    'visibility': 'visible',
                    'cancelable': true, // 用来表示对话框是否可以取消
                    'cancelOnTouchOutside': true, // 用来表示点击对话框外部是否可以取消
                    'buttons': [{
                        'text': '不保留', // 已注册好的事件
                        'jsHandle': 'close'
                    },
                        {
                            'text': '保留',
                            'jsHandle': 'saveMessage'
                        }
                    ]
                }
            })
        },
        // 老版本关闭页面
        closePage: function (countNum) {
            var that = this
            if (that.deviceType === 'android') {
                jsBridge.closePage(countNum)
            } else if (that.deviceType === 'ios') {
                Comm.content.bridge.callHandler('WVJS_popViewController', {
                    count: countNum
                })
            } else {
                if (app.deviceType.miniProgram) {
                    wx.miniProgram.navigateBack({
                        delta: countNum
                    })
                } else {
                    history.go(-countNum)
                }
            }
        },
        // 关闭网页调用新旧版本兼容
        closeReturn: function (pagenum) {
            var that = this
            // 这里写原生方达关闭页数
            if (app.newVersion) {
                // 大于
                jsBridge.callHandler('JsCallNativeMethod', {
                    'action': 'closePage',
                    'data': {
                        'count': pagenum
                    }
                })
            } else {
                // 小于
                that.closePage(pagenum)
            }
        },
        // 发布邀约
        async pushInvitation (option) {
            try {
                let { code, data, msg } = await api.pushInvitation(option.parame)
                if (code === 200) {
                    option.success && option.success(data)
                } else {
                    option.error && option.error({ code: code, data: data, msg: msg })
                    console.log(msg)
                }
            } catch {
                console.log('网络请求失败')
            }
        },
        // 判断是否实名
        async isAuthentication (option) {
            try {
                let { code, data, msg } = await api.isAuthentication(option.parame)
                if (code === 204) {
                    option.success && option.success({ code: code, data: data, msg: msg })
                } else {
                    option.error && option.error({ code: code, data: data, msg: msg })
                }
            } catch {
            }
        },
        clearContent: function (ev) {
            var obj = ev.currentTarget.parentNode.querySelector('input')
            this[ev.currentTarget.dataset.type] = ''
            obj.value = ''
            obj.blur()
        },
        goPage: function (ev) {
            var option = {
                url: ev.url || '',
                router: ev.router || '',
                params: ev.params || ''
            }
            app.goPage({
                type: 'url',
                url: concatUrl(option)
            })
        },
        // 吊起实名认证弹窗
        showalertBox: function () {
            var _this = this
            _this.$refs.content.classList.add('filter')

            _this.$refs.alertBoxMark.style.display = 'block'
            _this.$refs.alertBox.style.display = 'block'

            setTimeout(function () {
                _this.$refs.alertBoxMark.classList.add('active')
                _this.$refs.alertBox.classList.add('active')
            }, 50)
        },
        // 隐藏实名认证弹窗
        hidalertBox: function () {
            var _this = this
            _this.$refs.content.classList.remove('filter')
            _this.$refs.alertBoxMark.classList.remove('active')
            _this.$refs.alertBox.classList.remove('active')
            setTimeout(function () {
                _this.$refs.alertBoxMark.style.display = 'none'
                _this.$refs.alertBox.style.display = 'none'
                _this.isSend = false
            }, 300)
        },
        conformSend: function () {
            let _this = this
            if (_this.isSend) {
                return
            }
            if (this.activeName === '') {
                alert('请输入活动名称')
                return
            }
            if (this.activeName.length < 2) {
                alert('活动名称太短啦！')
                return
            }
            if (this.weChat === '') {
                alert('请输入个人微信号')
                return
            }
            if (this.activeDes === '') {
                alert('请输入活动描述')
                return
            }
            if (this.activeDes.length < 5) {
                alert('感觉活动描述不太清晰哦，请再说点什么吧~')
                return
            }
            if (this.activeDes.length > 500) {
                alert('描述太多啦！')
                return
            }

            this.parentData.remark = this.activeDes
            this.parentData.weChat = this.weChat
            this.parentData.invitationName = this.activeName

            localStorage.setItem('parentData', JSON.stringify(this.parentData))

            _this.isSend = true
            _this.isAuthentication({
                parame: {
                    upk: _this.upk
                },
                success: function () {
                    _this.showalertBox()
                },
                error: function (option) {
                    if (option.code === 205) {
                        _this.isRealName = true
                        _this.pushInvitation({
                            parame: {
                                data: _this.parentData
                            },
                            success: function (data) {
                                _this.changeShow(1)
                                _this.activeName = ''
                                _this.weChat = ''
                                _this.activeDes = ''
                                localStorage.setItem('parentData', '')
                                _this.isSend = false
                                setTimeout(function () {
                                    _this.goPage({
                                        url: 'detail',
                                        params: 'invitationId=' + data.invitationId + '&publish=1'
                                    })
                                }, 40)
                            }
                        })
                    } else {
                        app.toast(option.msg)
                    }
                }
            })
        },
        // 埋点
        analysis: function (option) {
            var pointData = option.data || {}
            pointData['s.paid'] = 2460
            pointData['s.ot'] = 2
            pointData['s.opid'] = 2462
            app.statistics(pointData)
        }
    },
    mounted: function () {
        console.log('two')
        var _this = this
        _this.$refs.activeName.addEventListener('blur', function () {
            this.value && (_this.activeName = this.value)
        })
        _this.$refs.activeName.addEventListener('input', function () {
            this.value && (_this.activeName = this.value)
        })
        _this.$refs.wechat.addEventListener('blur', function () {
            this.value && (_this.weChat = this.value)
        })
        _this.$refs.wechat.addEventListener('input', function () {
            this.value && (_this.weChat = this.value)
        })
        _this.$refs.activeDes.addEventListener('blur', function () {
            this.value && (_this.activeDes = this.value)
        })
        _this.$refs.activeDes.addEventListener('input', function () {
            this.value && (_this.activeDes = this.value)
        })
    }
}
</script>

<style scoped lang="scss">
    // eslint-disable-next-line
@import "~assets/style/base.scss";

@mixin center{
    font-size: 0;
    line-height: 0;
    &:before{
        content: '';
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
}
.wrap{
    padding:0 40px;
}
    .progressBox{
        width: 670px;
        height: 50px;
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .line{
            width: 600px;
            height: 4px;
            background: #E1E1E1;
            position: relative;
            overflow: hidden;

            .moveDom{
                width: 50px;
                height: 4px;
                background: linear-gradient(to right,rgba(225,225,225,0), #e1e1e1, rgba(225,225,225,0));
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                opacity: 0;
                animation: leftIn 3s infinite;
            }

            .proDom{
                height: 100%;
                background: #09D4D2;
                position: relative;
                display: block;

                &:after{
                    content: '';
                    width: 100px;
                    height: 100%;
                    position: absolute;
                    left: 100%;
                    background: linear-gradient(to right,#09D4D2,#E1E1E1);
                }

            }
        }

        .progressNum{
            font:24px/31px 'FuturaLT-Light';
            color: #000;
        }

    }
    .inputBox{
        height:150px;
        @include bottom;
        color: #e1e1e1;
        padding-top:50px;

        .inputBoxTitle{
            height:48px;
            padding:10px 0;
            font:34px/48px 'PingFangSC-Medium';
            color: #000;
        }

        .line{
            height:42px;
            padding:20px 0;
            width:100%;
            position: relative;
            display: block;
        }
        .input{
            height:42px;
            width:90%;
            font:30px/42px 'PingFangSC-Light';
            color: #999;
            border:none;
            background: transparent;

            &:focus ~ .icon{
                opacity: 1;
            }
        }

        .icon{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            color: #999;
            opacity: 0;
            transition: 0.3s;
            &.active{
                opacity: 1;
            }
        }

        .icon-searchDelete{
            font-size: 40px;
            padding: 20px 0 20px 20px;
            color: #ccc;
        }

    }

    .inputBoxDes{
        font:24px/40px 'PingFangSC-Light';
        color: #999;
        padding-top:20px;
    }

    .activeDesTit{
        height: 48px;
        padding:20px 0;
        margin-top:40px;
        font:34px/48px 'PingFangSC-Medium';
        color: #000;
    }
    .activeDesInput{
        height:280px;
        width:100%;
        border:none;
        background: #f5f5f5;
        line-height:40px;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
    }

.nextBtn{
    width: 670px;
    height: 90px;
    margin: 50px auto 50px;
    @include center;
    text-align: center;
    background: linear-gradient(40deg,#50A9EE,#30FFC0);
    border-radius: 4px;

    span{
        display: inline-block;
        vertical-align: middle;
        font: 34px/48px 'PingFangSC-Semibold';
        color: #fff;
    }
}

.content{
    position: relative;
    min-height: 80vh;
    transition:filter 0.4s 0.2s;
    padding-bottom: 160px;
}

.content.filter{
    filter:blur(10px);
}

.alertBoxMark{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    top: 0;
    left: 0;
    display: none;
    opacity: 0;
    transition: 0.5s;
    z-index: 9;

    &.active{
        opacity: 1;
    }
}

.alertBox{
    width: 570px;
    min-height: 250px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 90px;
    z-index: 9;
    box-sizing: border-box;
    text-align: center;
    display: none;
    opacity: 0;
    transform: translateY(0);
    transition: 0.3s;

    &.active{
        opacity: 1;
        transform: translateY(-50%);
    }

    .title{
        font: 30px/42px 'PingFangSC-Medium';
        padding:50px 20px 30px 20px;
        color: #1C1717;
    }
    .text{
        padding:0 20px 30px;
        font: 28px/40px 'PingFangSC-Light';
        color: #666;
    }

    .buttonLine{
        height: 90px;
        border-top: 1px solid #e1e1e1;
        display: flex;
        font:30px/90px 'PingFangSC-Light';
        text-align: center;
        color: #666;

        span{
            flex: 1;
        }

        span:first-child{
            border-right: 1px solid #e1e1e1;
        }
        span.active{
            font-weight: 400;
            color: #1C1717;
        }
    }
}

@keyframes leftIn {
    0%{
        left: 0;
        opacity: 0;
    }
    20%{
        opacity: 1;
    }
    100% {
        left: 100%;
        opacity: 1;
    }
}
</style>
