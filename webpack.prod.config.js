const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ // Prevents LICENSE.txt file creation and removes license comments in bundle file
      extractComments: false,
      terserOptions: {
        format: {
          comments: false,
        },
      },
    })],
  },
};