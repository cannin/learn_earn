require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Learn & Earn`,
    description: `Learn and earn`,
    author: `@cannin`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Learn & Earn`,
        short_name: `Learn & Earn`,
        start_url: `/`,
        background_color: `#CC0000`,
        theme_color: `#CC0000`,
        display: `standalone`,
        icon: `src/images/learn_earn_favico.png`, // This path is relative to the root of the site; red_square_80x80.png
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/game/`, `/pay`, `/about/`],
      },
    },
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        extensions: [`txt`],
        delimiter: '\t'
      },
    },
  ],
}
