import {
  createPackagingDataApiService,
  PACKAGING_DATA_API_NAME
} from '#/server/services/packaging-data-api.service.js'
import {
  createWasteSubmitRegPackagingApiService,
  WASTE_SUBMIT_REG_PACKAGING_API_NAME
} from '#/server/services/waste-submit-reg-packaging-api.service.js'

const defaultBackends = [
  { name: PACKAGING_DATA_API_NAME, create: createPackagingDataApiService },
  {
    name: WASTE_SUBMIT_REG_PACKAGING_API_NAME,
    create: createWasteSubmitRegPackagingApiService
  }
]

/**
 * Calls each backend's authenticated GET /describe endpoint, proving service-to-service
 * authentication works end to end. A backend that fails (unreachable, misconfigured, or refusing
 * our credentials) is reported as unavailable rather than failing the page.
 */
export async function getServiceStatuses(logger, backends = defaultBackends) {
  const results = await Promise.allSettled(
    backends.map(async (backend) => backend.create().describe())
  )

  return results.map((result, index) => {
    const { name } = backends[index]

    if (result.status === 'fulfilled') {
      return { name: result.value, healthy: true }
    }

    logger.warn(
      {
        error: {
          message: result.reason?.message,
          type: result.reason?.name,
          code: result.reason?.status
        }
      },
      `Backend ${name} is unavailable`
    )

    return { name, healthy: false }
  })
}
