import { config } from '#/config/config.js'
import { BaseApiService } from './base/base-api.service.js'

export const WASTE_SUBMIT_REG_PACKAGING_API_NAME =
  'waste-submit-reg-packaging-api'

export function createWasteSubmitRegPackagingApiService(
  options = config.get('wasteSubmitRegPackagingApi')
) {
  const api = new BaseApiService({
    serviceName: WASTE_SUBMIT_REG_PACKAGING_API_NAME,
    ...options
  })

  return {
    /** The service name from the authenticated GET /describe endpoint. */
    async describe() {
      const { service } = await api.getJson('/describe')
      return service
    }
  }
}
