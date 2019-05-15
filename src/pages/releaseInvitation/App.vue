<template>
    <div id="app" class="wrap">
        <stepOne
            :parentdata="invitationData"
            v-if="showItem===1"
            :changeShow = changeShow
        ></stepOne>
        <stepTwo
            :parentdata="invitationData"
            :changeShow = changeShow
            v-if="showItem===2"
        ></stepTwo>
        <attestation
            v-if="showItem===3"
            :changeShow = changeShow
        ></attestation>
    </div>
</template>

<script>

// 发布邀约第二步
import stepTwo from './components/stepTwo.vue'
export default {
    name: 'App',
    data () {
        return {
            cityName: '北京',
            invitationData: {
                accurateAdd: '', // 地点经纬度
                addressName: '', // 活动点名称
                area: '', // 邀约所在区
                areaId: '', // 区ID
                city: '', // 邀约所在城市
                cityId: '', // 城市ID
                province: '', // 邀约所在省
                provinceId: '', // 省ID
                startTime: '', // 邀约开始时间
                endTime: '', // 邀约结束时间
                image: '', // 展示图
                invitationName: '', // 邀约名称
                invitationRange: '', // 邀约范围
                invitationTypeId: '', // 邀约类型ID
                number: '', // 参与人数
                remark: '', // 邀约描述
                shopId: '', // 店铺ID
                upk: '', // 用户登录标识
                weChat: '' // 邀约发起人微信
            },
            showItem: 1
        }
    },
    methods: {
        changeCityName: function (ev) {
            this.cityName = ev.currentTarget.innerText
        },
        changeData: function (option) {
            Object.assign(this.invitationData, option)
        },
        changeShow: function (num) {
            this.showItem = Number(num)
            localStorage.setItem('nowPage', this.showItem)
        },
        handleSearch: function () {
            let q = {}
            location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v)
            return q
        },
        changeToattes: function (boolean) {
            this.attStatus = boolean
        }
    },
    computed: {},
    updated () {},
    mounted () {
        console.log('app')
        console.log(localStorage.getItem('nowPage'))
        if (localStorage.getItem('nowPage')) {
            this.showItem = Number(localStorage.getItem('nowPage'))
        }
    },
    components: {
        stepTwo,
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/base.scss";
@import "~assets/style/style.css";
</style>
