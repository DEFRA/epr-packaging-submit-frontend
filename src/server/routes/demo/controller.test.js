import { load } from 'cheerio'

import { createServer } from '#/server/server.js'
import { statusCodes } from '#/server/common/constants/status-codes.js'

describe('#demoControllers', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /demo/example-home-page', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-home-page'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should show the packaging task table without a form', () => {
      expect($('h1').text().trim()).toBe('EPR for packaging')
      expect($('.govuk-table')).toHaveLength(1)
      expect($('td').text()).toContain('1 April 2027')
      expect($('a[href="/demo/example-start-page?period=2026"]').text()).toBe(
        'Report now'
      )
      expect($('.govuk-grid-column-full form')).toHaveLength(0)
    })

    test('Should show a breadcrumb back to Waste & Circular Economy and no back link', () => {
      expect($('.govuk-breadcrumbs')).toHaveLength(1)
      expect($('.govuk-breadcrumbs__link').text().trim()).toBe(
        'Waste & Circular Economy'
      )
      expect($('.govuk-breadcrumbs__link').attr('href')).toBe('#')
      expect($('.govuk-back-link')).toHaveLength(0)
    })
  })

  describe('GET /demo/example-start-page', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-start-page?period=2026'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should render the 2026 start heading and a Start now link', () => {
      expect($('h1').text().trim()).toBe('Report packaging data for 2026')
      expect($('a.govuk-button--start').text().trim()).toBe('Start now')
      expect($('a.govuk-button--start').attr('href')).toBe(
        '/demo/example-question-page'
      )
    })

    test('Should not show a back link or a submit button', () => {
      expect($('.govuk-back-link')).toHaveLength(0)
      expect(
        $('.govuk-grid-column-two-thirds button[type="submit"]')
      ).toHaveLength(0)
    })

    test('Should default the period to 2026 when the query is missing', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-start-page'
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(load(result)('h1').text().trim()).toBe(
        'Report packaging data for 2026'
      )
    })
  })

  describe('GET /demo/example-question-page', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-question-page'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should render one layout caption and one heading', () => {
      expect($('[data-testid="app-heading-caption"]')).toHaveLength(1)
      expect($('[data-testid="app-heading-caption"]').text().trim()).toBe(
        'July to Dec 2026 (H2)'
      )
      expect(
        $('[data-testid="app-heading-caption"]').hasClass('govuk-caption-l')
      ).toBe(true)
      expect($('h1')).toHaveLength(1)
      expect($('h1').text().trim()).toBe('Your file has 3 warnings')
      expect($('h1').hasClass('govuk-heading-l')).toBe(true)
    })

    test('Should keep the default Continue button without double-click protection', () => {
      const $button = $('.govuk-grid-column-two-thirds button[type="submit"]')

      expect($('.govuk-back-link')).toHaveLength(1)
      expect($('.govuk-back-link').attr('href')).toBe(
        '/demo/example-start-page?period=2026'
      )
      expect($('input[name="summary-decision"]')).toHaveLength(2)
      expect($button).toHaveLength(1)
      expect($button.text().trim()).toBe('Continue')
      expect($button.attr('data-prevent-double-click')).toBeUndefined()
    })
  })

  describe('GET /demo/example-question-button-mod', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-question-button-mod'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should render the check heading and summary', () => {
      expect($('h1').text().trim()).toBe('Check your upload')
      expect($('.govuk-summary-list')).toHaveLength(1)
      expect($('body').text()).toContain('Tony Jackson')
      expect($('input[name="packaging-data-confirmation"]')).toHaveLength(1)
    })

    test('Should use the layout submit button with double-click protection', () => {
      const $button = $('.govuk-grid-column-two-thirds button[type="submit"]')

      expect($button).toHaveLength(1)
      expect($button.text().trim()).toBe('Submit packaging data')
      expect($button.attr('data-prevent-double-click')).toBe('true')
    })
  })

  describe('GET /demo/example-confirmation-page', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-confirmation-page'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should render the confirmation panel as the only heading', () => {
      expect($('.govuk-panel')).toHaveLength(1)
      expect($('.govuk-panel__title').text().trim()).toBe(
        'Packaging report submitted'
      )
      expect($('h1')).toHaveLength(1)
      expect($('[data-testid="app-heading-title"]')).toHaveLength(0)
    })

    test('Should hide the back link and the submit button', () => {
      expect($('.govuk-back-link')).toHaveLength(0)
      expect(
        $('.govuk-grid-column-two-thirds button[type="submit"]')
      ).toHaveLength(0)
      expect($('a[href="/demo/example-home-page"]').last().text().trim()).toBe(
        'Return to EPR home'
      )
    })
  })

  describe('POST redirects', () => {
    const postForm = async (url) => {
      const getResponse = await server.inject({ method: 'GET', url })
      const $ = load(getResponse.result)
      const cookies = getResponse.headers['set-cookie']

      return server.inject({
        method: 'POST',
        url,
        headers: {
          cookie: cookies ? cookies.join(';') : ''
        },
        payload: {
          crumb: $('input[name="crumb"]').val()
        }
      })
    }

    test('Should continue from the question page to check your upload', async () => {
      const result = await postForm('/demo/example-question-page')

      expect(result.statusCode).toBe(302)
      expect(result.headers.location).toBe('/demo/example-question-button-mod')
    })

    test('Should continue from check your upload to the confirmation page', async () => {
      const result = await postForm('/demo/example-question-button-mod')

      expect(result.statusCode).toBe(302)
      expect(result.headers.location).toBe('/demo/example-confirmation-page')
    })
  })
})
