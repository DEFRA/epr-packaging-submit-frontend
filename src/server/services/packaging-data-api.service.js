import { config } from '#/config/config.js'
import { BaseApiService } from './base/base-api.service.js'

export const PACKAGING_DATA_API_NAME = 'epr-packaging-data-api'

export function createPackagingDataApiService(
  options = config.get('packagingDataApi')
) {
  const api = new BaseApiService({
    serviceName: PACKAGING_DATA_API_NAME,
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
