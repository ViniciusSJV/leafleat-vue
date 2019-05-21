import ApiService from '@/common/Api'

export default {
  getFrotaCd (idCD) {
    return ApiService.get('frota', '?idCd=' + idCD)
  }
}
