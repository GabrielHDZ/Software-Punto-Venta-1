module.exports = {
    entry: './app/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ]
          }]
    }
};