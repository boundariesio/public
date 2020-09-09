const path = require('path');

// https://github.com/Redocly/redoc/issues/997
// which leads to this:
// https://github.com/gatsbyjs/gatsby/issues/17136#issuecomment-568036690
exports.onCreateWebpackConfig = ({ stage, loaders, getConfig, actions }) => {
  const config = getConfig();

  const coreJs2config = config.resolve.alias['core-js'];
  delete config.resolve.alias['core-js'];
  config.resolve.alias[`core-js/modules`] = `${coreJs2config}/modules`;
  try {
    config.resolve.alias[`core-js/es`] = path.dirname(require.resolve('core-js/es'));
  } catch (err) {}
  actions.replaceWebpackConfig(config);

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};
