const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  apply(compiler) {
    compiler.hooks.compilation.tap('InjectDecorator', (compilation) => {
      console.log('The compiler is starting a new compilation...');
      // Static Plugin interface |compilation |HOOK NAME | register listener
      console.log(HtmlWebpackPlugin.getHooks(compilation).beforeEmit);
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'InjectDecorator',
          (data, cb) => {
            // Manipulate the content
            console.log("injectig stuff");
            data.html += '<span>content</span>';
            // Tell webpack to move on
            cb(null, data);
          },
      );
    });
  },
};

