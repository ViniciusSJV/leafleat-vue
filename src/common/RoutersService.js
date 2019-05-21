import ApiService from '@/common/Api'

export default {
  getAllRoutersDayByIdMarker (idCd, date) {
    return ApiService.get('routers', '?idcd=' + idCd + '&date=' + date)
  },
  getDatesRouters (idCd) {
    return ApiService.get('routers/dates', '?idcd=' + idCd)
  }
}
