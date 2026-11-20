import { createServer } from '#/server/server.js'
import { statusCodes } from '#/server/common/constants/status-codes.js'

describe('#homeController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(result).toEqual(expect.stringContaining('Home |'))
    expect(result).toEqual(expect.stringContaining('govuk-phase-banner'))
    expect(result).toEqual(expect.stringContaining('Beta'))
    expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
    expect(result).toEqual(expect.stringContaining('Packaging EPR'))
    expect(result).toEqual(expect.stringContaining('Report packaging data'))
    expect(statusCode).toBe(statusCodes.ok)
  })
})
