const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	presets: ["@babel/preset-env"],
	plugins: [
	    ["@babel/plugin-transform-react-jsx", {
	     	"pragma": "h",
	     	"pragmaFrag": "Fragment"
		}],
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-optional-chaining",
		...(!isProduction ? ['react-refresh/babel'] : [])
 	]
}