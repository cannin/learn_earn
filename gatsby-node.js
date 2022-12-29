/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import config from "../../site-config"

// TODO Add reporter to handle errors
exports.createPages = async ({ actions, graphql }) => {
  const path = require("path")

  const gameTemplate = path.resolve(`src/templates/game-template.js`)

  const { createPage } = actions

  const sets = config.gameSets

    sets.forEach(setFilter => {
      createPage({
        path: `/game/${setFilter}/`,
        component: gameTemplate,
        context: {
          setFilter: setFilter
        },
      })
  })
}



//   // Make game pages
//   sets.forEach(setFilter => {
//     const result = graphql(
//       `
//         query($set: String!) {
//             allQuestionsAllTxt(filter: {set: {eq: $set}}) {
//               nodes {
//                 question
//                 answer
//               }
//             }
//         }
//       `,
//       {
//         set: set,
//       },
//     )
// })
