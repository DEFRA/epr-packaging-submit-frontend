/**
 * Demo example-question page controller.
 * Provided as an example of the form layout, remove or modify as required.
 */
export const exampleQuestionController = {
  handler(_request, h) {
    return h.view('demo/example-question', {
      pageTitle: 'Example question',
      heading: 'Example question',
      backLinkHref: '/'
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
