const periodCaption = 'July to Dec 2026 (H2)'

/**
 * Demo home page.
 * Account home for the packaging journey, with a breadcrumb back to Waste & Circular Economy.
 */
export const exampleHomePageController = {
  handler(_request, h) {
    return h.view('demo/example-home-page', {
      pageTitle: 'EPR for packaging',
      showBreadcrumbs: true,
      breadcrumbs: [
        {
          text: 'Waste & Circular Economy',
          href: '#'
        },
        {
          text: 'EPR for packaging'
        }
      ]
    })
  }
}

/**
 * Demo start page.
 * Period comes from ?period= and defaults to 2026. The heading uses that value
 * because the journey label map has no bare "2026" key.
 */
export const exampleStartPageController = {
  handler(request, h) {
    const period = request.query.period || '2026'
    const heading = `Report packaging data for ${period}`

    return h.view('demo/example-start-page', {
      pageTitle: heading,
      period
    })
  }
}

/**
 * Demo question page.
 * Warnings summary. The form layout supplies the caption, heading, back link, and Continue button.
 */
export const exampleQuestionPageController = {
  handler(request, h) {
    if (request.method === 'post') {
      return h.redirect('/demo/example-question-button-mod')
    }

    return h.view('demo/example-question-page', {
      pageTitle: 'Your file has 3 warnings',
      heading: 'Your file has 3 warnings',
      caption: periodCaption,
      backLinkHref: '/demo/example-start-page?period=2026',
      formAction: '/demo/example-question-page'
    })
  }
}

/**
 * Demo question page with a different submit button.
 * buttonText and preventDoubleClick are passed to the form layout; the button block is not overridden.
 */
export const exampleQuestionButtonModController = {
  handler(request, h) {
    if (request.method === 'post') {
      return h.redirect('/demo/example-confirmation-page')
    }

    return h.view('demo/example-question-button-mod', {
      pageTitle: 'Check your upload',
      heading: 'Check your upload',
      caption: periodCaption,
      backLinkHref: '/demo/example-question-page',
      formAction: '/demo/example-question-button-mod',
      buttonText: 'Submit packaging data',
      preventDoubleClick: true
    })
  }
}

/**
 * Demo confirmation page.
 * The panel is the page title. The form layout's submit button is removed.
 */
export const exampleConfirmationPageController = {
  handler(_request, h) {
    return h.view('demo/example-confirmation-page', {
      pageTitle: 'Packaging report submitted',
      headingMode: 'none',
      showBackLink: false
    })
  }
}
