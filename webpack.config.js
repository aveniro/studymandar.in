const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV;
const analyze = process.env.ANALYZE;

module.exports = {
	entry: {
		index: './src/index.js'	
	},
	mode,
	output: {
		filename: '[name].bundle.[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
			'#': path.resolve(__dirname, 'src/style/'),
			config: path.resolve(__dirname, 'config/'),
			state: path.resolve(__dirname, 'src/state/'),
			react: 'preact/compat'
		},
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.s?css$/, exclude: /node_modules/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			chunks: ['index']
		}),
		new webpack.DefinePlugin({
            'env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
		}),
		new CleanWebpackPlugin(),
		...(analyze === 'true' ? [new BundleAnalyzerPlugin()] : [])
	],
	devServer: {
        port: 9000,
        disableHostCheck: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        liveReload: false,
        overlay: false,
        inline: true,
        hot: true
	},
	optimization: {
		minimize: mode === 'production',
		minimizer: [new TerserPlugin({
			extractComments:false,
			parallel: true,
			sourceMap: true,
			terserOptions: {
				toplevel: true,
				mangle: true,
				output: {
					comments: false
				}
			}
		})]
	},
};