import { config } from '#/config/config.js'
import { createServer } from '#/server/server.js'
import { statusCodes } from '#/server/common/constants/status-codes.js'

describe('GOV.UK One Login service header', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    server.auth.scheme('signed-in', () => ({
      authenticate(_request, h) {
        return h.authenticated({ credentials: {} })
      }
    }))
    server.auth.strategy('signed-in', 'signed-in')
    server.route({
      method: 'GET',
      path: '/test/signed-in/{layout}',
      options: { auth: 'signed-in' },
      handler(request, h) {
        const view =
          request.params.layout === 'page' ? 'about/index' : 'home/index'

        return h.view(view, {
          pageTitle: 'Signed in',
          heading: 'Signed in'
        })
      }
    })
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Development shows Sign out without a signed-in user', async () => {
    config.set('isDevelopment', true)

    try {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('one-login-header'))
      expect(result).toEqual(expect.stringContaining('href="/oidc/logout"'))
      expect(result).not.toEqual(expect.stringContaining('class="govuk-header'))
    } finally {
      config.set('isDevelopment', false)
    }
  })

  test('Signed-out pages keep the GOV.UK header', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toEqual(expect.stringContaining('class="govuk-header'))
    expect(result).not.toEqual(expect.stringContaining('one-login-header'))
    expect(result).not.toEqual(expect.stringContaining('/oidc/logout'))
    expect(result).not.toEqual(expect.stringContaining('Sign out'))
  })

  test('Signed-in pages show the One Login header above service navigation', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/test/signed-in/main'
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toEqual(expect.stringContaining('one-login-header'))
    expect(result).toEqual(expect.stringContaining('href="/oidc/logout"'))
    expect(result).toEqual(
      expect.stringContaining('href="https://home.account.gov.uk"')
    )
    expect(result).toEqual(expect.stringContaining('GOV.UK One Login'))
    expect(result).not.toEqual(
      expect.stringContaining('https://home.account.gov.uk/sign-out')
    )
    expect(result).not.toEqual(expect.stringContaining('class="govuk-header'))

    const oneLogin = result.indexOf('one-login-header')
    const serviceNavigation = result.indexOf(
      'data-module="govuk-service-navigation"'
    )

    expect(serviceNavigation).toBeGreaterThan(oneLogin)
    expect(
      result.match(/data-module="govuk-service-navigation"/g)
    ).toHaveLength(1)
    expect(result.match(/Sign out/g)).toHaveLength(1)
  })

  test('Signed-in page layout does not repeat service navigation', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/test/signed-in/page'
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toEqual(expect.stringContaining('href="/oidc/logout"'))
    expect(result).toEqual(expect.stringContaining('govuk-service-navigation'))
    expect(result).not.toEqual(expect.stringContaining('class="govuk-header'))
    expect(
      result.match(/data-module="govuk-service-navigation"/g)
    ).toHaveLength(1)
  })
})
