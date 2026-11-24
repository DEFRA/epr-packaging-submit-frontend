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
    expect(result).not.toEqual(expect.stringContaining('govuk-breadcrumbs'))
    expect(result).not.toEqual(expect.stringContaining('govuk-back-link'))
    expect(statusCode).toBe(statusCodes.ok)

    const headerStart = result.indexOf('<header class="govuk-template__header"')
    const headerEnd = result.indexOf('</header>')
    const phaseBanner = result.indexOf('govuk-phase-banner')
    const serviceNavigation = result.indexOf(
      'data-module="govuk-service-navigation"'
    )
    const languageNavigation = result.indexOf('govuk-language-navigation')

    expect(headerStart).toBeGreaterThan(-1)
    expect(phaseBanner).toBeGreaterThan(headerStart)
    expect(headerEnd).toBeGreaterThan(phaseBanner)
    expect(serviceNavigation).toBeGreaterThan(-1)
    expect(languageNavigation).toBeGreaterThan(serviceNavigation)
    expect(result).toEqual(
      expect.stringContaining('govuk-service-navigation__inlining-container')
    )
    expect(result).not.toEqual(expect.stringContaining('wce-language-toggle'))
  })
})
