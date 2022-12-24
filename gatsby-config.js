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
        name: `learn_earn`,
        short_name: `learn_earn`,
        start_url: `/`,
        background_color: `#CC0000`,
        theme_color: `#CC0000`,
        display: `standalone`,
        icon: `src/images/red_square_80x80.png`, // This path is relative to the root of the site.
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
