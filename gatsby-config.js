module.exports = {
  plugins: [
    // {
    //   resolve: `gatsby-plugin-gdpr-cookies`,
    //   options: {
    //     googleAnalytics: {
    //       trackingId: 'UA-11539854-16',
    //       cookieName: 'gatsby-gdpr-google-analytics',
    //       anonymize: true
    //     }
    //   }
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-11539854-16',
        head: false,
        anonymize: true,
        respectDNT: true,
        cookieDomain: 'boundaries.io'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-theme-codebushi`,
      options: {
        tailwindConfig: `tailwind.config.js`
      }
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true
      }
    }
  ]
};
