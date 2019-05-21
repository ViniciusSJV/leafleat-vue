import ApiService from '@/common/Api'

export default {
  getAllCd (idCliente) {
    return ApiService.get('cd', '?idCliente=' + idCliente)
  },
  getAllPa (idCd) {
    return ApiService.get('pa', '?idCd=' + idCd)
  }
}
