/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// TODO Add reporter to handle errors
exports.createPages = async ({ actions, graphql }) => {
  const sets = ['multiplication_10x', 'multiplication_20x', 'us_capitals']

  const path = require("path")
  const { createPage } = actions

  const gameTemplate = path.resolve(`src/templates/game-template.js`)

  sets.forEach(set => {
    createPage({
      path: `/game/${set}/`,
      component: gameTemplate,
      context: {
        set: set
      },
    })
  })
}
