import { renderComponent } from '#/test-helpers/component-helpers.js'

describe('Heading Component', () => {
  let $heading

  describe('With caption', () => {
    beforeEach(() => {
      $heading = renderComponent('heading', {
        text: 'Services',
        caption: 'A page showing available services'
      })
    })

    test('Should render app heading component', () => {
      expect($heading('[data-testid="app-heading"]')).toHaveLength(1)
    })

    test('Should contain expected heading', () => {
      expect($heading('[data-testid="app-heading-title"]').text().trim()).toBe(
        'Services'
      )
    })

    test('Should have expected heading caption', () => {
      expect(
        $heading('[data-testid="app-heading-caption"]').text().trim()
      ).toBe('A page showing available services')
    })

    test('Should default to xl heading and caption classes', () => {
      expect($heading('[data-testid="app-heading-title"]').hasClass('govuk-heading-xl')).toBe(
        true
      )
      expect(
        $heading('[data-testid="app-heading-caption"]').hasClass('govuk-caption-xl')
      ).toBe(true)
    })
  })

  describe('With large size', () => {
    beforeEach(() => {
      $heading = renderComponent('heading', {
        text: 'Example question',
        caption: 'epr-packaging-submit-frontend',
        size: 'l'
      })
    })

    test('Should use large heading and caption classes', () => {
      expect($heading('[data-testid="app-heading-title"]').hasClass('govuk-heading-l')).toBe(
        true
      )
      expect(
        $heading('[data-testid="app-heading-caption"]').hasClass('govuk-caption-l')
      ).toBe(true)
    })
  })
})
