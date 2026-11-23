import {
  exampleHomeController,
  exampleQuestionController,
  exampleQuestionLegendController
} from './controller.js'

/**
 * Sets up the routes used in the /demo pages.
 * These routes are registered in src/server/router.js.
 */
export const demo = {
  plugin: {
    name: 'demo',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/demo/example-question',
          ...exampleQuestionController
        },
        {
          method: 'GET',
          path: '/demo/example-question-legend',
          ...exampleQuestionLegendController
        },
        {
          method: 'GET',
          path: '/demo/example-home',
          ...exampleHomeController
        }
      ])
    }
  }
}
