/**
 * Demo example-question page controller.
 * Provided as an example of the form layout (appHeading mode), remove or modify as required.
 */
export const exampleQuestionController = {
  handler(_request, h) {
    return h.view('demo/example-question', {
      pageTitle: 'Example question',
      heading: 'Example question',
      caption: 'epr-packaging-submit-frontend',
      backLinkHref: '/'
    })
  }
}

/**
 * Demo legend-as-page-heading question.
 * Caption comes from the form layout; the radios legend is the page h1.
 */
export const exampleQuestionLegendController = {
  handler(_request, h) {
    return h.view('demo/example-question-legend', {
      pageTitle: 'What type of packaging are you reporting?',
      heading: 'What type of packaging are you reporting?',
      caption: 'epr-packaging-submit-frontend',
      headingMode: 'legend',
      backLinkHref: '/demo/example-question'
    })
  }
}

const exampleHomeHeadings = [
  'Report your packaging data',
  'Check your organisation details',
  'Review your submission history',
  'Manage your account settings',
  'View your packaging obligations'
]

/**
 * Demo example-home page controller.
 * Provided as an example of the main layout with breadcrumbs, remove or modify as required.
 */
export const exampleHomeController = {
  handler(_request, h) {
    const heading =
      exampleHomeHeadings[
        Math.floor(Math.random() * exampleHomeHeadings.length)
      ]

    return h.view('demo/example-home', {
      pageTitle: heading,
      heading,
      showBreadcrumbs: true,
      breadcrumbs: [
        {
          text: 'Packaging EPR',
          href: '/'
        },
        {
          text: 'Demo'
        },
        {
          text: heading
        }
      ]
    })
  }
}
