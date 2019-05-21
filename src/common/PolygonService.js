import ApiService from '@/common/Api'

export default {
  geRegioes () {
    return ApiService.get('regioes', '?idCliente=' + 0)
  },

  geZonasRestricao () {
    return ApiService.get('zonarestricao', '?idCliente=' + 0)
  },

  createZonaRestricao (latLongs) {
    const payload = JSON.stringify({coordinates: latLongs})
    return ApiService.post('create-zonarestricao', payload)
  },

  createRegiao (latLongs) {
    const payload = JSON.stringify({coordinates: latLongs})
    return ApiService.post('create-regioes', payload)
  },

  updateZonaRestricao (idZonaRestricao, latLongs) {
    const payload = JSON.stringify({idZonaRestricao: idZonaRestricao, coordinates: latLongs})
    return ApiService.post('update-zonarestricao', payload)
  },

  updateRegiao (idRegiao, latLongs) {
    const payload = JSON.stringify({idRegiao: idRegiao, coordinates: latLongs})
    return ApiService.post('update-regioes', payload)
  }
}
