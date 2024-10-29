module.exports = {
  mode: "development",
  entry: "./app/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
          },
        ],
      },
      {
        test: /\.css$/, // Para archivos CSS regulares (no módulos)
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
