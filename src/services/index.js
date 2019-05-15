/**
 * api接口的统一出口
 */
import { get, post } from 'common/ajax'
import { getConfig } from 'common/utils'
const { url } = getConfig()
const { life, invitation, content } = url
export default {
    // 获取邀约详情
    getInviteDetail: (params) => get(`${invitation}/invitation/detail`, params),
    // 获取邀约详情页距离
    getStoreDistance: (params) => post(`${life}/api/v1/store/portion/details`, params),
    // 获取报名列表
    getRecordList: (params) => get(`${invitation}/invitation/recordList`, params),
    // 报名邀约
    signUp: (params) => post(`${invitation}/invitation/join`, params),
    // 查看微信号
    getWxCode: (params) => get(`${invitation}/invitation/getWeChat`, params),
    // 审核报名
    checkSubmit: (params) => post(`${invitation}/invitation/audit`, params),
    // 获取邀约首页banner列表
    getHomePageBanner: (params) => get(`${invitation}/banner/list`, params),
    // 获取邀约首页热门城市
    gethotCityList: (params) => get(`${invitation}/invitation/hotCitys`, params),
    // 获取邀约首页列表
    getInvitationList: (params) => get(`${invitation}/invitation/list`, params),
    // 获取城市转编码
    getCityCode: (params) => post(`${invitation}/invitation/cityCodeConvert`, params),
    // 获取店铺列表
    getStoreList: (params) => post(`${life}/api/v1/store/list`, params),
    // 获取所有店铺的城市
    getStoreCityList: (params) => get(`${life}/api/v1/store/cities`, params),
    // 获取活动类型
    getInvitationType: (params) => get(`${invitation}/invitationType/list`, params),
    // 实名认证
    authentication: (params) => post(`${invitation}/invitation/realNameValidate`, params),
    // 查询是否实名认证
    isAuthentication: (params) => get(`${invitation}/invitation/verify/realName`, params),
    // 发布邀约
    pushInvitation: (params) => post(`${invitation}/invitation/publish`, params),
    // 上传图片
    uploadFile: (params) => post(`${content}/content-service/api/upload/cutUpload`, params)
}
