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

  describe('GET /demo/example-question', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-question'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should render caption once from the form layout', () => {
      expect($('[data-testid="app-heading-caption"]')).toHaveLength(1)
      expect($('[data-testid="app-heading-caption"]').text().trim()).toBe(
        'epr-packaging-submit-frontend'
      )
    })

    test('Should render appHeading as the page title', () => {
      expect($('[data-testid="app-heading-title"]')).toHaveLength(1)
      expect($('[data-testid="app-heading-title"]').text().trim()).toBe(
        'Example question'
      )
      expect($('h1')).toHaveLength(1)
    })

    test('Should use large size for both caption and heading', () => {
      expect(
        $('[data-testid="app-heading-caption"]').hasClass('govuk-caption-l')
      ).toBe(true)
      expect(
        $('[data-testid="app-heading-title"]').hasClass('govuk-heading-l')
      ).toBe(true)
      expect($('.govuk-caption-xl, .govuk-heading-xl')).toHaveLength(0)
    })

    test('Should keep form chrome', () => {
      expect($('.govuk-back-link')).toHaveLength(1)
      expect($('.govuk-grid-column-two-thirds > form')).toHaveLength(1)
      expect(
        $('.govuk-grid-column-two-thirds button[type="submit"]').text().trim()
      ).toBe('Continue')
    })
  })

  describe('GET /demo/example-question-legend', () => {
    let $

    beforeAll(async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/demo/example-question-legend'
      })

      expect(statusCode).toBe(statusCodes.ok)
      $ = load(result)
    })

    test('Should render caption only from the form layout', () => {
      expect($('[data-testid="app-heading-caption"]')).toHaveLength(1)
      expect($('[data-testid="app-heading-caption"]').text().trim()).toBe(
        'epr-packaging-submit-frontend'
      )
      expect($('[data-testid="app-heading-title"]')).toHaveLength(0)
    })

    test('Should use the radios legend as the single page heading', () => {
      expect($('h1')).toHaveLength(1)
      expect($('h1').text().trim()).toBe(
        'What type of packaging are you reporting?'
      )
      expect($('input[name="packagingType"]')).toHaveLength(3)
    })

    test('Should use large size for both caption and legend heading', () => {
      expect(
        $('[data-testid="app-heading-caption"]').hasClass('govuk-caption-l')
      ).toBe(true)
      expect($('.govuk-fieldset__legend--l')).toHaveLength(1)
      expect($('.govuk-caption-xl, .govuk-heading-xl')).toHaveLength(0)
    })
  })
})
