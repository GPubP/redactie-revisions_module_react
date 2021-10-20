const path = require('path');

const { getModuleConfig } = require('@redactie/utils/dist/webpack');

const packageJSON = require('./package.json');

module.exports = env => {
	const defaultConfig = getModuleConfig({
		packageJSON,
		mainEntryPath: path.resolve(__dirname, './public/index.tsx'),
		tsIncludes: [/public/],
		sassIncludes: [/public/, /node_modules\/@a-ui\/core/],
		outputPath: path.resolve(__dirname, 'dist'),
		externals: {
			'@redactie/content-module': '@redactie/content-module',
			'@redactie/form-renderer-module': '@redactie/form-renderer-module',
			'@redactie/workflows-module': '@redactie/workflows-module',
		},
	})(env);

	return [defaultConfig];
};
