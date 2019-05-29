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

