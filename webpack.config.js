module.exports = {
    mode:'development',
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
            use: ['style-loader',{ loader:'css-loader',modules:true}]
        }]
    }
};