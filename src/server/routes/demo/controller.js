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
