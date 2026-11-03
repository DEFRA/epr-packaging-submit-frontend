import { createPackagingDataApiService } from './packaging-data-api.service.js'
import { createWasteSubmitRegPackagingApiService } from './waste-submit-reg-packaging-api.service.js'

describe.each([
  ['epr-packaging-data-api', createPackagingDataApiService],
  ['waste-submit-reg-packaging-api', createWasteSubmitRegPackagingApiService]
])('#%s service', (serviceName, create) => {
  test('describe() calls GET /describe and returns the service name', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ service: serviceName }), { status: 200 })
      )
    const service = create({
      baseUrl: 'http://backend.test',
      clientId: 'TestClient',
      clientSecret: 'test-secret',
      fetchImpl
    })

    await expect(service.describe()).resolves.toBe(serviceName)
    expect(fetchImpl).toHaveBeenCalledWith(
      'http://backend.test/describe',
      expect.objectContaining({ method: 'GET' })
    )
  })

  test('uses its own config by default', () => {
    expect(() => create()).not.toThrow()
  })
})
