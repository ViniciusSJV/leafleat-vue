import ApiService from '@/common/Api'

export default {
  getTagsFromPa (idPa) {
    return ApiService.get('patags', '?idPa=' + idPa)
  },
  getAbilityFromPa (idPa) {
    return ApiService.get('paabiliity', '?idPa=' + idPa)
  }
}
