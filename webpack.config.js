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
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react"] },
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
    ],
  },
};
